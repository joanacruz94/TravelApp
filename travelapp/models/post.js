'use strict';

const mongoose = require('mongoose');

const schemaPost = new mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  timestamps: {
    createAt: { 
      type : Date, 
      default: Date.now 
    },
    updateAt: { 
      type : Date, 
      default: Date.now 
    }
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: Number,
      min: -180,
      max: 180,
      lat: 0,
      lng: 0
    }
  },
  city: {
    type: String,
    required: true
  },
  postedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  countrie: {
    type: String,
    required: true
  },
  typePost: {
    type: String,
    enum: ['Restaurant', 'Hotel', 'Bar', 'Museum']
  },
  priceRange: {
    type: String,
    enum: ['Cheap', 'Regular', 'Expensive']
  }
});

const Post = mongoose.model('Post', schemaPost);

module.exports = Post;


