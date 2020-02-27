'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/user');
const bcryptjs = require('bcryptjs');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.serializeUser((user, callback) => {
  callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
  User.findById(id)
    .then(user => {
      callback(null, user);
    })
    .catch(error => {
      callback(error);
    });
});

passport.use(
  'local-sign-up',
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true
    },
    (req, email, password, callback) => {
      const description = req.body.description;
      const profilePic = req.file.secure_url;
      const name = req.body.username;
      bcryptjs
        .hash(password, 10)
        .then(hash => {
          return User.create({
            name,
            email,
            description,
            profilePic,
            passwordHash: hash
          });
        })
        .then(user => {
          callback(null, user);
        })
        .catch(error => {
          callback(error);
        });
    }
  )
);

passport.use(
  'local-sign-in',
  new LocalStrategy({ usernameField: 'email' }, (email, password, callback) => {
    let user;
    User.findOne({
      email
    })
      .then(document => {
        user = document;
        return bcryptjs.compare(password, user.passwordHash);
      })
      .then(passwordMatchesHash => {
        if (passwordMatchesHash) {
          callback(null, user);
        } else {
          callback(new Error('WRONG_PASSWORD'));
        }
      })
      .catch(error => {
        callback(error);
      });
  })
);


passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/authentication/google-callback"
  },
  (accessToken, refreshToken, profile, callback) => {
    User.findOne({
      googleId: profile.id
    })
      .then(user => {
        if (user) {
          return Promise.resolve(user);
        } else {
          return User.create({
            googleId: profile.id,
            name: profile.displayName,
            profilePic: profile.photos[0].value});
        }
      })
      .then(user => {
        callback(null, user);
      })
      .catch(error => {
        callback(error);
      });
}
));


