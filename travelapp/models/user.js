'use strict';

const mongoose = require('mongoose');

// User Model
const schemaUser = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  description: String,
  profilePic: {
    type: String,
    default: ''
  },
  visitedCountries: [String],
  visitedCities: [String]
});

const User = mongoose.model('User', schemaUser);

module.exports = User;
