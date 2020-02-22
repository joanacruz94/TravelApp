'use strict';

const { Router } = require('express');
const router = new Router();
const Post = require('./../models/post');

router.get('/create', (req, res, next) => {
    res.render('post/create');
});

router.post('/create', (req, res, next) => {
});

router.get('/:id/update', (req, res, next) => {
    res.render('post/edit');
});

router.post('/:id/update', (req, res, next) => {
});

router.post('/:id/delete', (req, res, next) => {
});

router.get('/:id', (req, res, next) => {
    res.render('post/show');
});

module.exports = router;
