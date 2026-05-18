const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Food item name is required'],
    trim: true
  },
  description: {
    type: String,
    maxlength: [300, 'Description cannot exceed 300 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  discountedPrice: {
    type: Number,
    default: null
  },
  image: {
    type: String,
    required: [true, 'Food image is required']
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  tags: [String],
  isVeg: {
    type: Boolean,
    default: false
  },
  isVegan: {
    type: Boolean,
    default: false
  },
  isGlutenFree: {
    type: Boolean,
    default: false
  },
  spiceLevel: {
    type: String,
    enum: ['mild', 'medium', 'hot', 'extra-hot'],
    default: 'mild'
  },
  calories: Number,
  rating: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 }
  },
  customizations: [{
    title: String,
    required: { type: Boolean, default: false },
    options: [{
      name: String,
      price: { type: Number, default: 0 }
    }]
  }],
  isAvailable: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isBestseller: {
    type: Boolean,
    default: false
  },
  preparationTime: {
    type: Number,
    default: 15
  },
  totalOrders: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

foodItemSchema.index({ name: 'text', description: 'text', tags: 'text' });
foodItemSchema.index({ restaurant: 1, isAvailable: 1 });

module.exports = mongoose.model('FoodItem', foodItemSchema);
