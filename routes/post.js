'use strict';

const { Router } = require('express');
const router = new Router();
const Post = require('./../models/post');
const User = require('./../models/user');
const uploadCloud = require('./../config/cloudinary-config.js');

router.get('/create', (req, res, next) => {
  res.render('post/create');
});

router.post('/create', uploadCloud.single('photo'), (req, res, next) => {
  const { title, description, type, lat, lng, countrie, city, price} = req.body;
  
  Post.create({
    title,
    description,
    image: req.file.secure_url,
    type,
    price,
    postedBy: req.user._id,
    countrie,
    city,
    location: {
      coordinates: [lat, lng]
    }
  })
    .then(post => {
      User.findByIdAndUpdate(req.user._id, {
        $push: { visitedCountries: post.countrie, visitedCities: post.city }
      })
        .then(user => {
          res.redirect('/logged');
        })
        .catch(error => {
          next(error);
        });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/delete', (req, res, next) => {
  const idPost = req.params.id;
  Post.findByIdAndDelete(idPost)
    .then(post => {
      res.redirect('/logged/social/profile');
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  const idPost = req.params.id;

  Post.findById(idPost)
    .populate('postedBy')
    .then(post => {
      const myPost = req.user._id.toString() === post.postedBy._id.toString();
      const data = { post, myPost };
      res.render('post/show', data);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
