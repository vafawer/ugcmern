const User = require("../models/User"); // If needed for authentication checks
const Preferences = require("../models/Preferences");

exports.getAllPreferences = async (req, res) => {
  try {
    const preferences = await Preferences.find();
    res.status(200).json(preferences);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.setPreferences = async (req, res) => {
 // editing preferences
};
