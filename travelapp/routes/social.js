'use strict';

const { Router } = require('express');
const router = new Router();
const Post = require('./../models/post');

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
  res.render('user/edit');
});

router.get('/update', (req, res, next) => {
  res.render('user/map');
});

router.get('/map', (req, res, next) => {
  const user = req.user;

  Post.find({ postedBy: user._id })
    .then(posts => {
      const data = [];
      posts.map(value =>
        data.push({ lat: value.location.coordinates[0], lng: value.location.coordinates[1] })
      );
      res.render('user/map', { data });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
