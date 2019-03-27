const express = require('express');
const router = express.Router();
const passport = require('passport');

// Validation
const validateUserEdit = require('../../validation/updateUser');

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

// PUT | Edit user by id
router.put(
  '/edit/user/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateUserEdit(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    User.findOne({ role: req.user.role })
      .then(user => {
        if (user.role) {
          const newUser = {};
          newUser.role = req.body.role;
          newUser.name = req.body.name;
          newUser.email = req.body.email;
          // Update
          User.findByIdAndUpdate(
            req.params.id,
            { $set: newUser },
            { new: true }
          )
            .then(user => res.json(user))
            .catch(err =>
              res.status(404).json({ error: 'Could not update User' })
            );
        } else {
          return res.status(401).json({ msg: 'Not Authorized' });
        }
      })
      .catch(err => res.status(404).json({ error: 'No User found' }));
  }
);

// DELETE || Delete user by id
router.delete(
  '/delete/user/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.role) {
      User.findById(req.params.id)
        .then(user => {
          user
            .remove()
            .then(() => res.json({ msg: 'User is successfully deleted' }));
        })
        .catch(err => res.status(404).json({ msg: 'No user found' }));
    } else {
      return res.status(401).json('Not Authorized');
    }
  }
);

module.exports = router;
