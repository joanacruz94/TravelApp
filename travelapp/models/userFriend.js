'use strict';

const mongoose = require('mongoose');

// User Model
const schemaUserFriend = new mongoose.Schema({
    userOne: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    },
    userTwo: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    },
    accepted: {
        type: Boolean
    },
    createAt: { 
        type : Date, 
        default: Date.now 
    }
});

const UserFriend = mongoose.model('UserFriend', schemaUserFriend);

module.exports = UserFriend;
