'use strict';

const { Router } = require('express');
const router = new Router();
const Post = require('./../models/post');

router.get('/profile', (req, res, next) => {
    const user = req.user;

    Post.find({'postedBy' : user._id})
    .then((posts) => {
        const data = {
            posts,
            user
        };
        res.render('user/profile', data);
    })
    .catch((error) => {
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

module.exports = router;
