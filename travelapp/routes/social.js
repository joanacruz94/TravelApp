'use strict';

const { Router } = require('express');
const router = new Router();
const Post = require('./../models/post');
const User = require('./../models/user');
const UserFriend = require('./../models/userFriend');
const uploadCloud = require('../cloudinary-config.js');
const nodemailer = require('nodemailer');
const EMAIL = 'joanamartadacruz@gmail.com';
const PASSWORD = 'JDamigos&';

/********* NODEMAILER **********/
//TODO - put in a different file
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: EMAIL,
    pass: PASSWORD
  }
});

/*********** ROUTES ***********/
router.get('/profile', (req, res, next) => {
  const user = req.user;
  const showButton = false;
  const userProf = true;

  Post.find({ postedBy: user._id })
    .then(posts => {
      const data = {
        posts,
        user,
        showButton,
        userProf
      };
      res.render('user/profile', data);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/profile/:id', (req, res, next) => {
  const _idOther = req.params.id;
  const myId = req.user._id;
  let showButton = true;
  const userProf = false;

  UserFriend.find({
    $or: [
      { userOne: _idOther, userTwo: myId },
      { userOne: myId, userTwo: _idOther }
    ]
  })
    .then(exist => {
      if (exist.length !== 0) showButton = false;
    })
    .catch(error => {
      next(error);
    });

  User.findById(_idOther)
    .then(user => {
      Post.find({ postedBy: user._id })
        .then(posts => {
          const data = {
            posts,
            user,
            showButton,
            _idOther,
            userProf
          };
          res.render('user/profile', data);
        })
        .catch(error => {
          next(error);
        });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/profile/:id/addFriend', (req, res, next) => {
  const userOne = req.user._id;
  const userTwo = req.params.id;

  const data = {
    userOne,
    userTwo,
    accepted: false
  };

  transporter
    .sendMail({
      from: `App <${EMAIL}>`,
      to: EMAIL,
      subject: 'I would love you to be friends with you',
      // text: 'Hello world!'
      html: 'Hello <strong>world</strong>'
    })
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    });
    res.render('utilities/main');

  UserFriend.create(data)
    .then(entrance => {
      res.redirect('/logged');
    })
    .catch(error => {
      next(error);
    });
});

router.get('/profile/:id/acceptFriend', (req, res, next) => {
  const myId = req.user._id;
  const _idOther = req.params.id;

  UserFriend.findOneAndUpdate({userOne: _idOther, userTwo: myId }, { accepted : true})
  .then(entrance => {
      res.redirect('/logged');
  })
  .catch(error => {
      next(error);
  });
});

router.get('/friends/:idUser', (req, res, next) => {
  const myId = req.user._id;
  const reqId = req.params.idUser;
  let findId = 0, friends;

  (myId === reqId) ? findId = myId : findId = reqId;

  UserFriend.find({ userOne: findId, accepted : true })
    .populate('userTwo')
    .then(friendsInUserTwo => {
      friends = friendsInUserTwo;
      return UserFriend.find({ userTwo: findId, accepted : true }).populate('userOne');
    })
    .then(friendsInUserOne => {
      friends = friends.concat(friendsInUserOne);
      const data = [];
      friends.map(value => {
        if (Object.keys(value.userOne).length - 1 > 1)
          data.push({
            email: value.userOne.email,
            id: value.userOne._id,
            request: false
          });
        else
          data.push({
            email: value.userTwo.email,
            id: value.userTwo._id,
            request: false
          });
      });
      res.render('user/friends', { data });
    })
    .catch(error => {
      next(error);
    });
});



router.get('/requests', (req, res, next) => {
  const myId = req.user._id;
  UserFriend.find({ userTwo: myId, accepted : false })
    .populate('userOne')
    .then(requests => {
      const data = [];
      requests.map(value => {
          data.push({
            email: value.userOne.email,
            id: value.userOne._id,
            request: true
          });
      });
      res.render('user/friends', { data });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/update', (req, res, next) => {
  const user = req.user;
  res.render('user/edit', { user });
});

router.post('/update', uploadCloud.single('photo'), (req, res, next) => {
  const description = req.body.description;
  const profilePic = req.file.secure_url;
  User.findByIdAndUpdate(req.user._id, { description, profilePic })
    .then(user => {
      res.redirect('/logged/social/profile');
    })
    .catch(error => {
      next(error);
    });
});

router.get('/map/:idUser', (req, res, next) => {
  const myId = req.user._id;
  const reqId = req.params.idUser;
  let findId = 0;

  (myId === reqId) ? findId = myId : findId = reqId;

  Post.find({ postedBy: findId })
    .then(posts => {
      const data = { posts };
      res.render('user/map', data);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;