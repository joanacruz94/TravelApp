'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');
const Post = require('./../models/post');

router.get('/', (req, res, next) => {
  res.render('index', { title: `Friend's Trip` });
});

router.get('/logged', routeGuard, (req, res, next) => {
  const search = req.query.search;
  console.log(search);
  let searchO = {};
  if (search) searchO = { $or: [{ 'countrie' : search },{ 'city' : search }]};

  console.log("SEARCH", search);

  console.log(searchO);

  Post.find(searchO)
  .then((posts) =>{
    const data = { posts };
    res.render('search', data);
  })
  .catch((error) => {
    next(error);
  });
});

module.exports = router;
