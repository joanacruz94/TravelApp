'use strict';

const { Router } = require('express');
const router = new Router();

router.get('/profile', (req, res, next) => {
    res.render('user/profile');
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

module.exports = router;
