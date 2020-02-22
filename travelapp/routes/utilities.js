'use strict';

const { Router } = require('express');
const router = new Router();

router.get('/', (req, res, next) => {
    res.render('utilities/main');
});

router.get('/recognition', (req, res, next) => {
    res.render('utilities/recognition');
});

router.get('/translation', (req, res, next) => {
    res.render('utilities/translation');
});

module.exports = router;
