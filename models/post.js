'use strict';

const mongoose = require('mongoose');

const schemaPost = new mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  timestamps: {
    createAt: {
      type: Date,
      default: Date.now
    },
    updateAt: {
      type: Date,
      default: Date.now
    }
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [
      {
        type: Number,
        min: -180,
        max: 180
      }
    ]
  },
  city: {
    type: String,
    required: true
  },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  countrie: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Restaurant', 'Hotel', 'Bar', 'Museum', 'Landscape', 'Beach', 'City', 'Other']
  },
  price: {
    type: String,
    enum: ['Cheap', 'Medium', 'Expensive']
  }
});

const Post = mongoose.model('Post', schemaPost);

module.exports = Post;
