'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');
const Post = require('./../models/post');
let firstTime = true;

router.get('/', (req, res, next) => {
  res.render('index', { title: `Friend's Trip` });
});

router.get('/logged', routeGuard, (req, res, next) => {
  const search = req.query.search;
  console.log(search);
  let searchO = {};
  const userName = req.user.name;
  if (search) searchO = { $or: [{ 'countrie' : search },{ 'city' : search }]};
  Post.find(searchO)
  .then((posts) =>{
    const data = { posts, userName, firstTime };
    res.render('search', data);
    firstTime = false;
  })
  .catch((error) => {
    next(error);
  });
});

module.exports = router;
