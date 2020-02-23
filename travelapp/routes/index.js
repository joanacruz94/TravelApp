'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');

router.get('/', (req, res, next) => {
  res.render('index', { title: `Friend's Trip` });
});

router.get('/logged', routeGuard, (req, res, next) => {
  res.render('search');
});

module.exports = router;
