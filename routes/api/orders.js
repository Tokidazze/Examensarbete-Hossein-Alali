const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load models
const User = require('../../models/User');
const Order = require('../../models/Order');
const Product = require('../../models/Product');

// Validation
const validateOrderInput = require('../../validation/order');

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
      user: req.user.id,
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
