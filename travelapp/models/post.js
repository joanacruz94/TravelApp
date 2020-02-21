'use strict';

const mongoose = require('mongoose');

const schemaPost = new mongoose.Schema({
  name: {
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
    createAt: Date.now,
    updateAt: Date.now
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

module.exports = mongoose.model('Post', schemaPost);
