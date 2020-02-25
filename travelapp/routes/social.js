'use strict';

const { Router } = require('express');
const router = new Router();
const Post = require('./../models/post');
const User = require('./../models/user');
const UserFriend = require('./../models/userFriend');
const uploadCloud = require('../cloudinary-config.js');

router.get('/profile', (req, res, next) => {
  const user = req.user;
  const showButton = false;

  Post.find({ postedBy: user._id })
    .then(posts => {
      const data = {
        posts,
        user,
        showButton
      };
      res.render('user/profile', data);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/profile/:id', (req, res, next) => {
  const _idOther = req.params.id;
  console.log(_idOther);
  const myId = req.user._id;
  let showButton = true;

  UserFriend.find({
    $or: [
      { userOne: _idOther, userTwo: myId },
      { userOne: myId, userTwo: _idOther }
    ]
  })
    .then(() => {
      showButton = false;
    })
    .catch(error => {
      next(error);
    });

  User.findById(_idOther)
    .then(user => {
      console.log(user);
      Post.find({ postedBy: user._id })
        .then(posts => {
          const data = {
            posts,
            user,
            showButton,
            _idOther
          };
          res.render('user/profile', data);
        })
        .catch(error => {
          next(error);
        });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/profile/:id/addFriend', (req, res, next) => {
  const userOne = req.user._id;
  const userTwo = req.params.id;

  const data = {
    userOne,
    userTwo
  };

  UserFriend.create(data)
    .then(entrance => {
      console.log(entrance);
      res.redirect('/logged');
    })
    .catch(error => {
      next(error);
    });
});

router.get('/friends', (req, res, next) => {
  const userOne = req.user._id;

  UserFriend.find({ userOne })
    .then(() => {
      res.render('user/friends');
    })
    .catch(error => {
      next(error);
    });
});

router.get('/update', (req, res, next) => {
  const user = req.user;
  res.render('user/edit', { user });
});

router.post('/update', uploadCloud.single('photo'), (req, res, next) => {
  const description = req.body.description;
  const profilePic = req.file.secure_url;
  User.findByIdAndUpdate(req.user._id, { description, profilePic })
    .then(user => {
      console.log(user);
      res.redirect('/logged/social/profile');
    })
    .catch(error => {
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
