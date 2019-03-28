const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load models
const User = require('../../models/User');
const Order = require('../../models/Order');
const Product = require('../../models/Product');

// Validation
const validateOrderInput = require('../../validation/order');

// GET | Get all orders
router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.role) {
      Order.find()
        .sort({ date: -1 })
        .then(orders => {
          if (orders.length > 0) {
            return res.status(200).json(orders);
          } else {
            return res.status(404).json({ error: 'Could not find any orders' });
          }
        })
        .catch(err => res.status(400).json(err));
    } else {
      return res.status(404).json({ msg: 'Not authorized' });
    }
  }
);

// GET | Get order by id
router.get(
  '/order/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Order.findById(req.params.id)
      .then(order => {
        if (order.userId == req.user.id || req.user.role) {
          return res.status(200).json(order);
        } else {
          return res.status(401).json({ msg: 'Not authorized' });
        }
      })
      .catch(err => res.status(400).json(err));
  }
);

// POST | Create new order
router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateOrderInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Get product_id and quantity from orderProducts
    // TODO: remove hardcoded values and replace with real
    const cart = [
      {
        productTitle: 'Sekiro',
        quantity: 1,
        price: 550
      },
      {
        productTitle: 'Nier Automata',
        quantity: 2,
        price: 250
      }
    ];

    let totalSum = 0;

    for (let i = 0; i < cart.length; i++) {
      totalSum += cart[i].quantity * cart[i].price;
    }

    const newOrder = new Order({
      userId: req.user.id,
      orderProducts: cart,
      totalSum: totalSum,
      customerFirstName: req.body.customerFirstName,
      customerLastName: req.body.customerLastName,
      address: req.body.address,
      zip: req.body.zip,
      city: req.body.city
    });

    newOrder
      .save()
      .then(order => res.json(order))
      .catch(err => res.json(err));
  }
);

module.exports = router;
