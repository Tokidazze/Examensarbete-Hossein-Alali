const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  customerFirstName: {
    type: String,
    required: true
  },
  customerLastName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  totalSum: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  orderProducts: [
    {
      productId: {
        type: String,
        required: true
      },
      productTitle: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ]
});

module.exports = Orders = mongoose.model('orders', OrderSchema);
