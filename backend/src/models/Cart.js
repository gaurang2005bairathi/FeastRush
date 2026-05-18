const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  },
  items: [{
    foodItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FoodItem',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    price: {
      type: Number,
      required: true
    },
    customizations: [{
      title: String,
      selectedOption: String,
      additionalPrice: { type: Number, default: 0 }
    }],
    totalPrice: Number
  }],
  subtotal: {
    type: Number,
    default: 0
  },
  deliveryFee: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: 0
  },
  appliedCoupon: {
    code: String,
    discountAmount: Number
  }
}, { timestamps: true });

cartSchema.methods.calculateTotals = function() {
  this.subtotal = this.items.reduce((sum, item) => sum + (item.totalPrice || item.price * item.quantity), 0);
  this.total = this.subtotal + this.deliveryFee - this.discount;
  return this;
};

module.exports = mongoose.model('Cart', cartSchema);
