'use strict';

const { Router } = require('express');
const router = new Router();
const Post = require('./../models/post');
const User = require('./../models/user');
const uploadCloud = require('../cloudinary-config.js');

router.get('/profile', (req, res, next) => {
  const user = req.user;

  Post.find({ postedBy: user._id })
    .then(posts => {
      const data = {
        posts,
        user
      };
      res.render('user/profile', data);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/friends', (req, res, next) => {
  res.render('user/friends');
});

router.get('/update', (req, res, next) => {
    const user = req.user;
     res.render('user/edit', { user });
});

router.post('/update', uploadCloud.single('photo'), (req, res, next) => {
    const description = req.body.description;
    const profilePic = req.file.secure_url;
    User.findByIdAndUpdate(req.user._id, { description, profilePic })
    .then((user) => {
        console.log(user);
        res.redirect('/logged/social/profile');
    }) 
    .catch((error) => {
        next(error);
    });
});

router.get('/map', (req, res, next) => {
  const user = req.user;

  Post.find({ postedBy: user._id })
    .then(posts => {
      const data = { posts };
      res.render('user/map', data);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
