const mongoose = require('mongoose');
const SocialLink = require('./SocialLink');
const Preferences = require('./Preferences');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Assuming you'll store the URL to the photo
    required: false, // Make it optional
  },
  preferences: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Preferences'
  },
  socialLinks: [{
    type: Schema.Types.ObjectId,
    ref: 'SocialLink',
  }],
  cards: [{
    type: Schema.Types.ObjectId,
    ref: 'Card',
  }]
});

UserSchema.pre('save', async function(next) {
  if (this.isNew) { // Check if this is a new user document
    const defaultPreferences = new Preferences(); // Create a new Preferences instance with default values
    const savedPreferences = await defaultPreferences.save(); // Save the new Preferences document
    this.preferences = savedPreferences._id; // Associate the new Preferences document with the user
  }
  next();
});


module.exports = mongoose.model('User', UserSchema);