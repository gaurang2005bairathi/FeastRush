const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Restaurant name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  image: {
    type: String,
    required: [true, 'Restaurant image is required']
  },
  coverImage: {
    type: String,
    default: ''
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  cuisine: [String],
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: String,
    zipCode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  contact: {
    phone: String,
    email: String,
    website: String
  },
  rating: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 }
  },
  deliveryInfo: {
    time: { type: String, default: '30-40 min' },
    fee: { type: Number, default: 0 },
    minOrder: { type: Number, default: 0 },
    freeDeliveryAbove: { type: Number, default: 0 }
  },
  offers: [{
    title: String,
    description: String,
    discount: Number,
    code: String,
    validUntil: Date
  }],
  tags: [String],
  isOpen: {
    type: Boolean,
    default: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  operatingHours: {
    open: { type: String, default: '09:00' },
    close: { type: String, default: '22:00' }
  },
  totalOrders: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

restaurantSchema.pre('save', function() {
  if (this.isModified('name')) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') + '-' + Date.now();
  }
});

restaurantSchema.index({ name: 'text', cuisine: 'text', tags: 'text' });
restaurantSchema.index({ 'address.city': 1, isActive: 1 });

module.exports = mongoose.model('Restaurant', restaurantSchema);
