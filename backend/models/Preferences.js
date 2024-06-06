const mongoose = require('mongoose');
const PreferencesSchema = new mongoose.Schema({
    color: { type: String, default: '#ffffff' },
    font: { type: String, default: 'Arial' },
    // other fields...
  });
  
  module.exports = mongoose.model('Preferences', PreferencesSchema);
  