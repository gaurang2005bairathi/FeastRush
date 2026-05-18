const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const {
  createOrder, getUserOrders, getOrderById, cancelOrder, updateOrderStatus, getAllOrders, getAnalytics
} = require('../controllers/orderController');

router.use(protect);
router.post('/', createOrder);
router.get('/my-orders', getUserOrders);
router.get('/:id', getOrderById);
router.put('/:id/cancel', cancelOrder);

// Admin routes
router.get('/', adminOnly, getAllOrders);
router.put('/:id/status', adminOnly, updateOrderStatus);
router.get('/admin/analytics', adminOnly, getAnalytics);

module.exports = router;
