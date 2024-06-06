const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const jwtSecret = process.env.JWT_SECRET;

// User login
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
          // Generate a token
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
          res.json({ user, token });
        } else {
          res.status(401).json({ message: 'Invalid credentials' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
      }
};

// User registration
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.log(error.message);
        res.status(500).json({ message: 'Error creating user' });
      }
};

exports.getUser = async (req, res) => {
  try {
    const username = req.params.username;
      const user = await User.findOne({ username: username });
      res.json(user);
  } catch (error) {
    console.log(error.message);
      res.status(500).json({ message: 'Error creating user' });
    }
};

// Update profile
exports.updateProfile = async (req, res) => {
    // Similar to the 'update-profile' route logic
};

// Change password
exports.changePassword = async (req, res) => {
    // Similar to the 'change-password' route logic
};

// Delete account
exports.deleteAccount = async (req, res) => {
    // Similar to the 'delete-account' route logic
};

// Add other user-related controllers as needed

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Нет доступа',
    });
  }
};
