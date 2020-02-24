'use strict';

const { Router } = require('express');
const router = new Router();
const Post = require('./../models/post');
const User = require('./../models/user');
const UserFriend = require('./../models/userFriend');
const uploadCloud = require('../cloudinary-config.js');

router.get('/profile', (req, res, next) => {
  const user = req.user;
  const notUser = false;

  Post.find({ postedBy: user._id })
    .then(posts => {
      const data = {
        posts,
        user,
        notUser
      };
      res.render('user/profile', data);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/profile/:id', (req, res, next) => {
    const _id = req.params.id;
    const notUser = req.user._id === _id;

    User.findOne({ _id })
      .then(user => {
        Post.find({ postedBy: user._id })
        .then(posts => {
            console.log(user);
          const data = {
            posts,
            user,
            notUser
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
    .then(() => {
        res.redirect('user/profile');
    })
    .catch((error) => {
        next(error);
    });
});

router.get('/friends', (req, res, next) => {
    const userOne = req.user._id;

    UserFriend.find({ userOne })
    .then(() => {
        res.render('user/friends');
    })
    .catch((error) => {
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
