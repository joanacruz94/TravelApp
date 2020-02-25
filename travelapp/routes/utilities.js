'use strict';

const { Router } = require('express');
const router = new Router();
//const translate = require('google-translate-api');

 
router.get('/', (req, res, next) => {
    res.render('utilities/main');
});

router.get('/recognition', (req, res, next) => {
    res.render('utilities/recognition');
});

router.get('/translation', (req, res, next) => {
    res.render('utilities/translation');
});

router.post('/translation', (req, res, next) => {
    const text = req.body.text;

});

module.exports = router;
