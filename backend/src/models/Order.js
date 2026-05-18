const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  items: [{
    foodItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FoodItem'
    },
    name: String,
    price: Number,
    quantity: Number,
    totalPrice: Number,
    customizations: [{
      title: String,
      selectedOption: String,
      additionalPrice: Number
    }]
  }],
  deliveryAddress: {
    label: String,
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: String,
    zipCode: String,
    instructions: String
  },
  pricing: {
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: { type: Number, required: true }
  },
  payment: {
    method: {
      type: String,
      enum: ['cash', 'card', 'upi', 'wallet'],
      default: 'cash'
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: String
  },
  status: {
    type: String,
    enum: ['placed', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'placed'
  },
  statusHistory: [{
    status: String,
    timestamp: { type: Date, default: Date.now },
    message: String
  }],
  estimatedDelivery: Date,
  deliveredAt: Date,
  cancellation: {
    reason: String,
    cancelledAt: Date,
    cancelledBy: String
  },
  rating: {
    food: { type: Number, min: 1, max: 5 },
    delivery: { type: Number, min: 1, max: 5 },
    comment: String
  },
  couponCode: String,
  specialInstructions: String
}, { timestamps: true });

orderSchema.pre('save', async function() {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `FR${Date.now().toString().slice(-6)}${(count + 1).toString().padStart(4, '0')}`;
  }
});

orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ restaurant: 1, status: 1 });

module.exports = mongoose.model('Order', orderSchema);
