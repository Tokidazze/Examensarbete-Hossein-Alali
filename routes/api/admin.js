const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

// GET | Get all users
router.get(
  '/users/all',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Check user role
    if (req.user.role) {
      // User role true
      User.find()
        .sort({ date: -1 })
        .then(users => res.status(200).json(users))
        .catch(err => res.status(404).json(err));
    } else {
      return res.status(401).json({ msg: 'Not authorized' });
    }
  }
);

// GET | User by id
router.get(
  '/user/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.role) {
      User.findById(req.params.id)
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json(err));
    } else {
      return res.status(401).json({ msg: 'Not authorized' });
    }
  }
);

module.exports = router;
