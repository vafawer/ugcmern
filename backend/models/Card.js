const mongoose = require('mongoose');
const User = require('./User');
const { Schema } = mongoose;
const slugify = require('slugify');
//var URLSlug = require("mongoose-slug-generator");

//mongoose.plugin(URLSlug);

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A card must have a title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'A card must have a description'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'A card must have an image URL'],
    trim: true
  },
  link: {
    type: String,
    required: [true, 'A card must have a link'],
    trim: true
  },
  slug: {
    type: String,
    slug: "title",
    unique: true,
    //required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A card must have an owner']
  },
  
}, {
  timestamps: true // Optional: if you want Mongoose to automatically manage createdAt and updatedAt properties for your documents
});

cardSchema.pre('validate', async function(next) {
  if (this.isModified('title') || this.isNew) {
    let slug = slugify(this.title, { lower: true, strict: true });
    let counter = 0;
    let slugExists = true;

    while (slugExists) {
      const existingSlug = slug + (counter ? `-${counter}` : '');
      let existingCard = await this.constructor.findOne({ slug: existingSlug });
      if (existingCard) {
        counter++;
      } else {
        this.slug = existingSlug;
        slugExists = false;
      }
    }
  }
  next();
});
//cardSchema.index({ slug: 1 });

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;