const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_ACC53YkxOKvJhReQKoVio1JP00YawGn872');
const passport = require('passport');

// Load models
const Order = require('../../models/Order');
const User = require('../../models/User');

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
    console.log('hej');

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const allProducts = req.body.orderProducts.map(item => {
      return {
        productId: item._id,
        productTitle: item.title,
        quantity: item.quantity,
        price: item.price
      };
    });

    const newOrder = new Order({
      userId: req.user.id,
      orderProducts: allProducts,
      totalSum: req.body.totalSum,
      customerFirstName: req.body.customerFirstName,
      customerLastName: req.body.customerLastName,
      address: req.body.address,
      zip: req.body.zip,
      city: req.body.city
    });

    User.findById(req.user.id, function(err, user) {
      if (err)
        return res
          .status(500)
          .json({ error: 'error occurred when binding order to user' });
      if (!user)
        return res
          .status(404)
          .json({ error: 'error occurred trying to fetch user' });
      user.orders.push(newOrder);
      user.save();
    });

    newOrder
      .save()
      .then(order => res.json(order))
      .catch(err => res.json(err));
  }
);

router.post('/payment', (req, res) => {
  console.log('payment');
  console.log(req.body.customerData);
  const amount = 5000;

  stripe.customers
    .create({
      email: req.body.stripeToken.email,
      source: req.body.stripeToken.id
    })
    .then(customer =>
      stripe.charges.create({
        amount,
        description: 'whatever',
        currency: 'sek',
        customer: customer.id
      })
    )
    .then(charge => res.status(200));
});

module.exports = router;
