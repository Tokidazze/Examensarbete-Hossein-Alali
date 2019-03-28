const express = require('express');
const router = express.Router();
const passport = require('passport');

// Models
const Product = require('../../models/Product');

// Validation
const validateProductInput = require('../../validation/product');

// GET | Get all products
router.get('/all', (req, res) => {
  Product.find()
    .sort({ date: -1 })
    .then(products => res.json(products))
    .catch(err => res.status(404).json({ products: 'No products found' }));
});

// GET | Get product by id
router.get('/product/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(prod => res.status(200).json(prod))
    .catch(err => res.status(404).json({ product: 'No product found' }));
});

// POST | Create new product
router.post(
  '/create/product',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProductInput(req.body);

    // To check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Product.findOne({ title: req.body.title }).then(prod => {
      if (prod) {
        errors.title = prod.title + ' already exists';
        return res.status(400).json(errors);
      } else {
        if (!isValid) {
          return res.status(400).json(errors);
        }
        const user = req.user;

        // Check user for admin rights
        if (user.role) {
          const newProd = new Product({
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            price: req.body.price,
            category: req.body.category.split(','),
            stock: req.body.stock,
            available: req.body.available
          });
          newProd
            .save()
            .then(product => res.json(product))
            .catch(err => res.json(err));
        } else {
          return res.status(401).json('Not authorized');
        }
      }
    });
  }
);

module.exports = router;
