const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const {
  getAllRestaurants, getRestaurantById, getRestaurantMenu, createRestaurant,
  updateRestaurant, deleteRestaurant, getFeaturedRestaurants, searchRestaurants
} = require('../controllers/restaurantController');

router.get('/', getAllRestaurants);
router.get('/featured', getFeaturedRestaurants);
router.get('/search', searchRestaurants);
router.get('/:id', getRestaurantById);
router.get('/:id/menu', getRestaurantMenu);
router.post('/', protect, adminOnly, createRestaurant);
router.put('/:id', protect, adminOnly, updateRestaurant);
router.delete('/:id', protect, adminOnly, deleteRestaurant);

module.exports = router;
