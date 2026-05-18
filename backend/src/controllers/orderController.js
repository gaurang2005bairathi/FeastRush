const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Restaurant = require('../models/Restaurant');
const FoodItem = require('../models/FoodItem');

exports.createOrder = async (req, res, next) => {
  try {
    const { deliveryAddress, paymentMethod = 'cash', specialInstructions, couponCode } = req.body;

    const cart = await Cart.findOne({ user: req.user._id }).populate('items.foodItem');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    const restaurant = await Restaurant.findById(cart.restaurant);
    if (!restaurant || !restaurant.isActive) {
      return res.status(400).json({ success: false, message: 'Restaurant is not available' });
    }

    const orderItems = cart.items.map(item => ({
      foodItem: item.foodItem._id,
      name: item.foodItem.name,
      price: item.price,
      quantity: item.quantity,
      totalPrice: item.totalPrice,
      customizations: item.customizations
    }));

    const tax = Math.round(cart.subtotal * 0.05);
    const estimatedDelivery = new Date(Date.now() + 45 * 60 * 1000);

    const order = await Order.create({
      user: req.user._id,
      restaurant: cart.restaurant,
      items: orderItems,
      deliveryAddress,
      pricing: {
        subtotal: cart.subtotal,
        deliveryFee: cart.deliveryFee,
        discount: cart.discount,
        tax,
        total: cart.subtotal + cart.deliveryFee - cart.discount + tax
      },
      payment: { method: paymentMethod, status: paymentMethod === 'cash' ? 'pending' : 'pending' },
      status: 'placed',
      statusHistory: [{ status: 'placed', message: 'Order placed successfully' }],
      estimatedDelivery,
      couponCode,
      specialInstructions
    });

    // Update restaurant total orders
    await Restaurant.findByIdAndUpdate(cart.restaurant, { $inc: { totalOrders: 1 } });

    // Update food item total orders
    for (const item of cart.items) {
      await FoodItem.findByIdAndUpdate(item.foodItem._id, { $inc: { totalOrders: item.quantity } });
    }

    // Clear cart
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [], restaurant: null, subtotal: 0, deliveryFee: 0, discount: 0, total: 0 }
    );

    await order.populate('restaurant', 'name image address');
    res.status(201).json({ success: true, message: 'Order placed successfully!', data: order });
  } catch (error) {
    next(error);
  }
};

exports.getUserOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const query = { user: req.user._id };
    if (status) query.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [orders, total] = await Promise.all([
      Order.find(query).populate('restaurant', 'name image').sort('-createdAt').skip(skip).limit(parseInt(limit)),
      Order.countDocuments(query)
    ]);

    res.json({ success: true, data: orders, pagination: { total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) } });
  } catch (error) {
    next(error);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('restaurant', 'name image address contact')
      .populate('items.foodItem', 'name image');

    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

exports.cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (['delivered', 'out_for_delivery'].includes(order.status)) {
      return res.status(400).json({ success: false, message: 'Cannot cancel order at this stage' });
    }

    order.status = 'cancelled';
    order.cancellation = { reason: req.body.reason || 'Cancelled by user', cancelledAt: new Date(), cancelledBy: 'user' };
    order.statusHistory.push({ status: 'cancelled', message: 'Order cancelled by customer' });
    await order.save();

    res.json({ success: true, message: 'Order cancelled successfully', data: order });
  } catch (error) {
    next(error);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status, message } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status,
        $push: { statusHistory: { status, message: message || `Order ${status}` } },
        ...(status === 'delivered' ? { deliveredAt: new Date() } : {})
      },
      { new: true }
    );

    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, message: 'Order status updated', data: order });
  } catch (error) {
    next(error);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const query = {};
    if (status) query.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [orders, total] = await Promise.all([
      Order.find(query).populate('user', 'name email').populate('restaurant', 'name').sort('-createdAt').skip(skip).limit(parseInt(limit)),
      Order.countDocuments(query)
    ]);

    res.json({ success: true, data: orders, pagination: { total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) } });
  } catch (error) {
    next(error);
  }
};

exports.getAnalytics = async (req, res, next) => {
  try {
    const [totalOrders, totalRevenue, recentOrders, statusCounts] = await Promise.all([
      Order.countDocuments(),
      Order.aggregate([{ $group: { _id: null, total: { $sum: '$pricing.total' } } }]),
      Order.find().sort('-createdAt').limit(5).populate('user', 'name').populate('restaurant', 'name'),
      Order.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }])
    ]);

    res.json({
      success: true,
      data: {
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        recentOrders,
        statusCounts: statusCounts.reduce((acc, s) => { acc[s._id] = s.count; return acc; }, {})
      }
    });
  } catch (error) {
    next(error);
  }
};
