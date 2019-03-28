const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  avalaible: {
    type: Boolean,
    default: true
  },
  stock: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Products = mongoose.model('products', ProductSchema);
