// Import required models and packages
const SocialLink = require('../models/SocialLink');
const User = require('../models/User');
const fs = require('fs');

// Controller to get all social links
exports.getAllSocialLinks = async (req, res) => {
    try {
        const links = await SocialLink.find();
        res.status(200).json(links);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//Get specific user social links
exports.getUserSocialLinks = async (req, res) => {
  try {
    // Assuming `req.userId` is set and contains the ID of the user
    const links = await SocialLink.find({ owner: req.params.id });
    res.json(links); // This will return an array of cards
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

//Controller to get single social link
exports.getSocialLink = async (req, res) => {
    try {
        const link = await SocialLink.findById(req.params.id);
        if (!link) {
          return res.status(404).json("Not Found");
        }
        res.json(link);
    } catch (error) {
        res.status(404).send(error.message);
    }
}

// Controller to add a new social link
exports.addSocialLink = async (req, res) => {
    try {
        const newLink = new SocialLink({
          title: req.body.title,
          url: req.body.url,
          image: req.file.path,
          owner: req.userId,
        });
  
      const link = await newLink.save();
      // Assuming you have the User model imported and req.userId is available
      await User.findByIdAndUpdate(req.userId, {
        $push: { links: link._id }
    });
        res.status(200).json(link);
      } catch (error) {
          console.log(error);
          res.status(400).send(error.message);
      }
};

// Controller to delete a social link
exports.deleteSocialLink = async (req, res) => {
    // Add your logic for deleting a card
    try {
        const result = await SocialLink.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            return res.status(404).json("Social Link not found");
        }
        res.status(200).json("Deleted");
    } catch (error) {
      console.log(error);
    }
};

// Controller to update a social link
exports.editSocialLink = async (req, res) => {
    // Add your logic for editing a card
  try {
    // Update the card and fetch the updated document
    const updatedLink = await SocialLink.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        url: req.body.url,
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
