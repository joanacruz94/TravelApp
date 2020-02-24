'use strict';

const { Router } = require('express');
const router = new Router();
const Post = require('./../models/post');
const uploadCloud = require('../cloudinary-config.js');

router.get('/create', (req, res, next) => {

    res.render('post/create');
});

router.post('/create', uploadCloud.single('photo'), (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const type = req.body.type;
    const price = req.body.priceRange;
    const lat = req.body.lat;
    const lng = req.body.lng;

    console.log(lat);
    console.log(lng);
    
    Post.create({
        'title': title,
        'content': description,
        'image': req.file.secure_url,
        'typePost': type,
        'priceRange': price,
        'postedBy': req.user._id,
        'countrie': 'Portugal',
        'city': 'Braga',
        'location': {
            coordinates: [lat, lng]
        }
    })
    .then((post) => {
        res.redirect('/logged')
    })
    .catch((error) => {
        next(error);
    });
});

router.get('/:id/update', (req, res, next) => {
    res.render('post/edit');
});

router.post('/:id/update', (req, res, next) => {
});

router.post('/:id/delete', (req, res, next) => {
});

router.get('/:id', (req, res, next) => {
    const idPost = req.params.id;

    Post.findById(idPost)
    .then((post) => {
        const data = { post };
        res.render('post/show', data);
    })
    .catch((error) => {
        next(error);
    })
});

module.exports = router;
