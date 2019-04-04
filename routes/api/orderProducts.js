const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

// Load models
const Product = require('../../models/Product');

// POST | Create order product
router.post(
  '/create/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Product.findById(req.params.id)
      .then(product => {
        const newOrderProduct = {};
        newOrderProduct.productId = product.id;
        newOrderProduct.quantity = req.body.quantity;
        console.log(newOrderProduct);
        newOrderProduct
          .save()
          .then(orderProduct => res.status(200).json(orderProduct))
          .catch(err => res.json(err));
      })
      .catch(err => res.json(err));
  }
);

module.exports = router;
