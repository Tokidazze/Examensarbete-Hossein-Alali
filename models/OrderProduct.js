const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderProductSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'products'
  },
  quantity: {
    type: Number,
    required: true
  }
});

module.exports = OrderProducts = mongoose.model(
  'orderProducts',
  OrderProductSchema
);
