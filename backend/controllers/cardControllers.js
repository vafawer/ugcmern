const Card = require("../models/Card");
const User = require("../models/User"); // If needed for authentication checks

// Import any other required libraries or modules

exports.getAllCards = async (req, res) => {
    try {
        const cards = await Card.find();
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCard = async (req, res) => {
    try {
      const card = await Card.findById(req.params.id);
      if (!card) {
        return res.status(404).json("Not Found");
      }
        res.json(card);
    } catch (error) {
        res.status(404).send(error.message);
    }
};
exports.getUserCards = async (req, res) => {
  try {
    // Assuming `req.userId` is set and contains the ID of the user
    const cards = await Card.find({ owner: req.params.id });
    res.json(cards); // This will return an array of cards
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

exports.addCard = async (req, res) => {
    // Add your logic for adding a card
    
        try {
          const newCard = new Card({
            title: req.body.title,
            description: req.body.description,
            link: req.body.link,
            image: req.file.path,
            owner: req.userId,
          });
          //await newCard.save();
    
          const card = await newCard.save();
          // Assuming you have the User model imported and req.userId is available
        await User.findByIdAndUpdate(req.userId, {
          $push: { cards: card._id }
      });
            console.log(card);
          res.status(200).json(card);
        } catch (error) {
            console.log(error);
            res.status(400).send(error.message);
        }
     
};

exports.deleteCard = async (req, res) => {
    // Add your logic for deleting a card
    try {
        const result = await Card.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            return res.status(404).json("Card not found");
        }
        res.status(200).json("Deleted");
    } catch (error) {
      console.log(error);
    }
  
};

exports.editCard = async (req, res) => {
  // Add your logic for editing a card
  try {
    // Update the card and fetch the updated document
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        link: req.body.link,
        ...(req.file && { image: req.file.path }),
        updatedAt: Date.now(),
      },
      { new: true }
    );

    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
