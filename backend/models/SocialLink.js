const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SocialLinkSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  url: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A card must have an owner']
  },
});

const SocialLink = mongoose.model('SocialLink', SocialLinkSchema);
module.exports = SocialLink;