const FoodItem = require('../models/FoodItem');

exports.getAllFoods = async (req, res, next) => {
  try {
    const { page = 1, limit = 12, restaurant, category, search, isVeg, featured, sort = '-createdAt' } = req.query;
    const query = { isAvailable: true };

    if (restaurant) query.restaurant = restaurant;
    if (category) query.category = category;
    if (isVeg === 'true') query.isVeg = true;
    if (featured === 'true') query.isFeatured = true;
    if (search) query.$text = { $search: search };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [foods, total] = await Promise.all([
      FoodItem.find(query).populate('restaurant', 'name image').populate('category', 'name emoji').sort(sort).skip(skip).limit(parseInt(limit)),
      FoodItem.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: foods,
      pagination: { total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) }
    });
  } catch (error) {
    next(error);
  }
};

exports.getFoodById = async (req, res, next) => {
  try {
    const food = await FoodItem.findById(req.params.id)
      .populate('restaurant', 'name image rating deliveryInfo')
      .populate('category', 'name emoji');
    if (!food) return res.status(404).json({ success: false, message: 'Food item not found' });
    res.json({ success: true, data: food });
  } catch (error) {
    next(error);
  }
};

exports.createFood = async (req, res, next) => {
  try {
    const food = await FoodItem.create(req.body);
    res.status(201).json({ success: true, message: 'Food item created successfully', data: food });
  } catch (error) {
    next(error);
  }
};

exports.updateFood = async (req, res, next) => {
  try {
    const food = await FoodItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!food) return res.status(404).json({ success: false, message: 'Food item not found' });
    res.json({ success: true, message: 'Food item updated successfully', data: food });
  } catch (error) {
    next(error);
  }
};

exports.deleteFood = async (req, res, next) => {
  try {
    const food = await FoodItem.findByIdAndUpdate(req.params.id, { isAvailable: false }, { new: true });
    if (!food) return res.status(404).json({ success: false, message: 'Food item not found' });
    res.json({ success: true, message: 'Food item deleted successfully' });
  } catch (error) {
    next(error);
  }
};

exports.getPopularDishes = async (req, res, next) => {
  try {
    const dishes = await FoodItem.find({ isAvailable: true, isBestseller: true })
      .populate('restaurant', 'name image')
      .populate('category', 'name emoji')
      .limit(12).sort('-totalOrders -rating.average');
    res.json({ success: true, data: dishes });
  } catch (error) {
    next(error);
  }
};

exports.searchFoods = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ success: false, message: 'Search query required' });

    const foods = await FoodItem.find({
      isAvailable: true,
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } }
      ]
    }).populate('restaurant', 'name image').populate('category', 'name emoji').limit(20);

    res.json({ success: true, data: foods });
  } catch (error) {
    next(error);
  }
};
