'use strict';

const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate')

// User Model
const schemaUser = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String
  },
  description: String,
  profilePic: {
    type: String,
    default: ''
  },
  googleId: {
    type: String
  },
  visitedCountries: [String],
  visitedCities: [String]
});

schemaUser.plugin(findOrCreate);
const User = mongoose.model('User', schemaUser);

module.exports = User;
