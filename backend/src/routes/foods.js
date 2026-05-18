const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const {
  getAllFoods, getFoodById, createFood, updateFood, deleteFood, getPopularDishes, searchFoods
} = require('../controllers/foodController');

router.get('/', getAllFoods);
router.get('/popular', getPopularDishes);
router.get('/search', searchFoods);
router.get('/:id', getFoodById);
router.post('/', protect, adminOnly, createFood);
router.put('/:id', protect, adminOnly, updateFood);
router.delete('/:id', protect, adminOnly, deleteFood);

module.exports = router;
