'use strict';

const { Router } = require('express');
const passport = require('passport');
const router = new Router();
const uploadCloud = require('../cloudinary-config.js');

router.get('/sign-up', (req, res, next) => {
  res.render('sign-up');
});

router.post(
  '/sign-up',
  uploadCloud.single('photo'),
  passport.authenticate('local-sign-up', {
    successRedirect: '/logged',
    failureRedirect: '/sign-up'
  })
);

router.get('/sign-in', (req, res, next) => {
  res.render('sign-in');
});

router.post(
  '/sign-in',
  passport.authenticate('local-sign-in', {
    successRedirect: '/logged',
    failureRedirect: '/sign-in'
  })
);

router.post('/sign-out', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

router.get('/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/google-callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/logged');
  });

// router.get('/google', passport.authenticate('google'));

// router.get(
//   '/google-callback',
//   passport.authenticate('google', {
//     successRedirect: '/logged',
//     failureRedirect: '/sign-in'
//   })
// );

module.exports = router;
