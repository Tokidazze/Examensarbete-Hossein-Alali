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
  '/create',
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

// PUT | Update/Edit product by id
router.put(
  '/update/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.role) {
      // const { errors, isValid } = validateProductInput(req.body);

      // if (!isValid) {
      //   return res.status(400).json(errors);
      // }

      // Get product id from url
      const prodId = req.params.id;

      // Create new object from req.body
      const newProds = {};
      newProds.title = req.body.title;
      newProds.description = req.body.description;
      newProds.image = req.body.image;
      newProds.price = req.body.price;
      newProds.category = req.body.category;
      newProds.stock = req.body.stock;
      newProds.available = req.body.available;

      // Find product and update it
      Product.findByIdAndUpdate(prodId, { $set: newProds }, { new: true })
        .then(prod => res.json(prod))
        .catch(err => res.json(err));
    } else {
      return res.status(401).json({ err: 'Not authorized' });
    }
  }
);

// DELETE | Delete product by id
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.role) {
      Product.findById(req.params.id)
        .then(product => {
          product.remove().then(() => {
            res.status(200).json({ msg: 'Product successfully deleted' });
          });
        })
        .catch(() => res.status(404).json({ msg: 'No product found' }));
    } else {
      return res.status(401).json({ msg: 'Not authorized' });
    }
  }
);

module.exports = router;
