const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Chatkit = require('@pusher/chatkit-server');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Models
const User = require('../../models/User');

// New insatnce of chatkit with keys
const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:464a2e86-22e9-4b79-a7c1-67f315f2ce5e',
  key:
    '6dac4cb2-0045-4b9c-a6e0-37ea66442b59:DMfHKuYnc5IpPbz2BnPGfOPNZtROS07Hmq0zsoIcD5s='
});

// POST | Register a new user
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ name: req.body.name }).then(user => {
    if (user) {
      errors.name = 'Username already exists';
      return res.status(400).json(errors);
    } else {
      User.findOne({ email: req.body.email }).then(user => {
        if (user) {
          errors.email = 'Email already exists';
          return res.status(400).json(errors);
        } else {
          chatkit
            .createUser({
              name: req.body.name,
              id: req.body.name
            })
            .then(() => res.sendStatus(201))
            .catch(err => console.log(err));

          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  });
});

// POST | Sign in user
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    //Check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    // Check password, isMatch is boolean
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Match
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          orders: user.orders
        }; // Create JWT payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 86400 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

router.post('/chatAuth', (req, res) => {
  const authData = chatkit.authenticate({
    userId: req.query.user_id
  });

  res
    .status(authData.status)
    .set(authData.headers)
    .send(authData.body);
});

// GET | Get current user
router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //req.user sends the whole user
    res.json({
      id: req.user.id,
      role: req.user.role,
      name: req.user.name,
      email: req.user.email,
      orders: req.user.orders
    });
  }
);

module.exports = router;
