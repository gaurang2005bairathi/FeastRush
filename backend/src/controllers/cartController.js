const Cart = require('../models/Cart');
const FoodItem = require('../models/FoodItem');
const Restaurant = require('../models/Restaurant');

exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate('items.foodItem', 'name image price discountedPrice isAvailable')
      .populate('restaurant', 'name image deliveryInfo');

    if (!cart) {
      return res.json({ success: true, data: { items: [], subtotal: 0, deliveryFee: 0, discount: 0, total: 0 } });
    }
    res.json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const { foodItemId, quantity = 1, customizations } = req.body;

    const food = await FoodItem.findById(foodItemId).populate('restaurant');
    if (!food || !food.isAvailable) {
      return res.status(404).json({ success: false, message: 'Food item not available' });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (cart && cart.restaurant && cart.restaurant.toString() !== food.restaurant._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Your cart has items from a different restaurant. Clear cart to add items from this restaurant.',
        clearRequired: true
      });
    }

    const itemPrice = food.discountedPrice || food.price;
    const customizationPrice = customizations?.reduce((sum, c) => sum + (c.additionalPrice || 0), 0) || 0;
    const totalItemPrice = (itemPrice + customizationPrice) * quantity;

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        restaurant: food.restaurant._id,
        items: [],
        deliveryFee: food.restaurant.deliveryInfo?.fee || 0
      });
    }

    const existingItemIndex = cart.items.findIndex(
      item => item.foodItem.toString() === foodItemId
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].totalPrice = (itemPrice + customizationPrice) * cart.items[existingItemIndex].quantity;
    } else {
      cart.items.push({
        foodItem: foodItemId,
        quantity,
        price: itemPrice,
        customizations,
        totalPrice: totalItemPrice
      });
    }

    cart.calculateTotals();
    await cart.save();
    await cart.populate('items.foodItem', 'name image price discountedPrice');
    await cart.populate('restaurant', 'name image deliveryInfo');

    res.json({ success: true, message: 'Item added to cart', data: cart });
  } catch (error) {
    next(error);
  }
};

exports.updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

    const itemIndex = cart.items.findIndex(item => item._id.toString() === req.params.itemId);
    if (itemIndex === -1) return res.status(404).json({ success: false, message: 'Item not found in cart' });

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
      cart.items[itemIndex].totalPrice = cart.items[itemIndex].price * quantity;
    }

    if (cart.items.length === 0) {
      cart.restaurant = null;
    }

    cart.calculateTotals();
    await cart.save();
    await cart.populate('items.foodItem', 'name image price discountedPrice');

    res.json({ success: true, message: 'Cart updated', data: cart });
  } catch (error) {
    next(error);
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

    cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);

    if (cart.items.length === 0) cart.restaurant = null;

    cart.calculateTotals();
    await cart.save();
    res.json({ success: true, message: 'Item removed from cart', data: cart });
  } catch (error) {
    next(error);
  }
};

exports.clearCart = async (req, res, next) => {
  try {
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [], restaurant: null, subtotal: 0, deliveryFee: 0, discount: 0, total: 0, appliedCoupon: null },
      { upsert: true }
    );
    res.json({ success: true, message: 'Cart cleared successfully' });
  } catch (error) {
    next(error);
  }
};
