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
  const userProf = true;

  Post.find({ postedBy: user._id })
    .then(posts => {
      const data = {
        posts,
        user,
        showButton,
        userProf
      };
      res.render('user/profile', data);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/profile/:id', (req, res, next) => {
  const _idOther = req.params.id;
  const myId = req.user._id;
  let showButton = true;
  const userProf = false;

  UserFriend.find({
    $or: [
      { userOne: _idOther, userTwo: myId },
      { userOne: myId, userTwo: _idOther }
    ]
  })
    .then(exist => {
      if (exist.length !== 0) showButton = false;
    })
    .catch(error => {
      next(error);
    });

  User.findById(_idOther)
    .then(user => {
      Post.find({ postedBy: user._id })
        .then(posts => {
          const data = {
            posts,
            user,
            showButton,
            _idOther,
            userProf
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
      res.redirect('/logged');
    })
    .catch(error => {
      next(error);
    });
});

router.get('/friends', (req, res, next) => {
  const myId = req.user._id;
  let friends;
  UserFriend.find({ userOne: myId })
    .populate('userTwo')
    .then(friendsInUserTwo => {
      friends = friendsInUserTwo;
      return UserFriend.find({ userTwo: myId }).populate('userOne');
    })
    .then(friendsInUserOne => {
      friends = friends.concat(friendsInUserOne);
      const data = [];
      friends.map(value => {
        console.log(value);
        if (Object.keys(value.userOne).length - 1 > 1)
          data.push({
            email: value.userOne.email,
            id: value.userOne._id
          });
        else
          data.push({
            email: value.userTwo.email,
            id: value.userTwo._id
          });
      });
      res.render('user/friends', { data });
    })
    //   //value.userOne === myId ? idSearch = value.userTwo : idSearch = value.userOne;

    // })
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
