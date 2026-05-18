const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const { getAllUsers, getUserById, updateUserRole, toggleUserStatus, getUserStats } = require('../controllers/userController');

router.use(protect, adminOnly);
router.get('/', getAllUsers);
router.get('/stats', getUserStats);
router.get('/:id', getUserById);
router.put('/:id/role', updateUserRole);
router.put('/:id/toggle-status', toggleUserStatus);

module.exports = router;
