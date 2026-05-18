const Restaurant = require('../models/Restaurant');
const FoodItem = require('../models/FoodItem');

exports.getAllRestaurants = async (req, res, next) => {
  try {
    const { page = 1, limit = 12, category, cuisine, search, featured, sort = '-createdAt' } = req.query;
    const query = { isActive: true };

    if (category) query.categories = category;
    if (cuisine) query.cuisine = { $in: [cuisine] };
    if (featured === 'true') query.isFeatured = true;
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [restaurants, total] = await Promise.all([
      Restaurant.find(query).populate('categories', 'name emoji').sort(sort).skip(skip).limit(parseInt(limit)),
      Restaurant.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: restaurants,
      pagination: { total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)), limit: parseInt(limit) }
    });
  } catch (error) {
    next(error);
  }
};

exports.getRestaurantById = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate('categories', 'name emoji');
    if (!restaurant || !restaurant.isActive) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }
    res.json({ success: true, data: restaurant });
  } catch (error) {
    next(error);
  }
};

exports.getRestaurantMenu = async (req, res, next) => {
  try {
    const { category } = req.query;
    const query = { restaurant: req.params.id, isAvailable: true };
    if (category) query.category = category;

    const items = await FoodItem.find(query).populate('category', 'name emoji').sort('-isBestseller -isFeatured');
    res.json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

exports.createRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.create({ ...req.body, owner: req.user._id });
    res.status(201).json({ success: true, message: 'Restaurant created successfully', data: restaurant });
  } catch (error) {
    next(error);
  }
};

exports.updateRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found' });
    res.json({ success: true, message: 'Restaurant updated successfully', data: restaurant });
  } catch (error) {
    next(error);
  }
};

exports.deleteRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found' });
    res.json({ success: true, message: 'Restaurant deleted successfully' });
  } catch (error) {
    next(error);
  }
};

exports.getFeaturedRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find({ isActive: true, isFeatured: true })
      .populate('categories', 'name emoji').limit(8).sort('-rating.average');
    res.json({ success: true, data: restaurants });
  } catch (error) {
    next(error);
  }
};

exports.searchRestaurants = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ success: false, message: 'Search query required' });

    const restaurants = await Restaurant.find({
      isActive: true,
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { cuisine: { $in: [new RegExp(q, 'i')] } },
        { tags: { $in: [new RegExp(q, 'i')] } }
      ]
    }).populate('categories', 'name emoji').limit(20);

    res.json({ success: true, data: restaurants });
  } catch (error) {
    next(error);
  }
};
