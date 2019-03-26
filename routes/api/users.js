const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Models
const User = require('../../models/User');

// POST | Register a new user
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' });
    } else {
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
});

// POST | Sign in user
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    // Check password, isMatch is boolean
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Match
        const payload = { id: user.id, firstName: user.firstName, lastName: user.lastName };

        // Sign Token
        jwt.sign(payload, keys.secretOrKey, { expiresIn: 86400 }, (err, token) => {
          res.json({
            success: true,
            token: 'Bearer ' + token
          });
        });
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

// GET | Get current user
router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
  //req.user send the whole user
  res.json(req.user);
});

module.exports = router;
