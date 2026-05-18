const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Review = require('../models/Review');
const Restaurant = require('../models/Restaurant');

router.get('/restaurant/:restaurantId', async (req, res, next) => {
  try {
    const reviews = await Review.find({ restaurant: req.params.restaurantId })
      .populate('user', 'name avatar').sort('-createdAt').limit(20);
    res.json({ success: true, data: reviews });
  } catch (error) { next(error); }
});

router.post('/', protect, async (req, res, next) => {
  try {
    const { restaurant, rating, title, comment, orderId } = req.body;
    const review = await Review.create({ user: req.user._id, restaurant, rating, title, comment, order: orderId });

    // Update restaurant rating
    const allReviews = await Review.find({ restaurant });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    await Restaurant.findByIdAndUpdate(restaurant, { 'rating.average': Math.round(avgRating * 10) / 10, 'rating.count': allReviews.length });

    res.status(201).json({ success: true, message: 'Review submitted successfully', data: review });
  } catch (error) { next(error); }
});

module.exports = router;
