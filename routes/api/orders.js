const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load models
const User = require('../../models/User');
const Order = require('../../models/Order');
const Product = require('../../models/Product');

module.exports = router;
