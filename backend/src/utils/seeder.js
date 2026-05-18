const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');
const Category = require('../models/Category');
const Restaurant = require('../models/Restaurant');
const FoodItem = require('../models/FoodItem');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/feastrush');
  console.log('✅ MongoDB Connected for seeding');
};

const categories = [
  { name: 'Pizza', slug: 'pizza', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400', emoji: '🍕', order: 1 },
  { name: 'Burgers', slug: 'burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', emoji: '🍔', order: 2 },
  { name: 'Sushi', slug: 'sushi', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400', emoji: '🍣', order: 3 },
  { name: 'Indian', slug: 'indian', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400', emoji: '🍛', order: 4 },
  { name: 'Chinese', slug: 'chinese', image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400', emoji: '🥡', order: 5 },
  { name: 'Desserts', slug: 'desserts', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400', emoji: '🍰', order: 6 },
  { name: 'Salads', slug: 'salads', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', emoji: '🥗', order: 7 },
  { name: 'Tacos', slug: 'tacos', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400', emoji: '🌮', order: 8 },
  { name: 'Pasta', slug: 'pasta', image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400', emoji: '🍝', order: 9 },
  { name: 'Drinks', slug: 'drinks', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400', emoji: '🥤', order: 10 }
];

const seedDB = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Promise.all([User.deleteMany(), Category.deleteMany(), Restaurant.deleteMany(), FoodItem.deleteMany()]);
    console.log('🗑️  Cleared existing data');

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@feastrush.com',
      password: 'admin123',
      role: 'admin',
      phone: '+1234567890'
    });

    // Create test user
    await User.create({
      name: 'John Doe',
      email: 'user@feastrush.com',
      password: 'user123',
      phone: '+0987654321'
    });

    console.log('👥 Users created');

    // Create categories
    const createdCategories = await Category.insertMany(categories);
    console.log('📂 Categories created');

    const pizzaCat = createdCategories.find(c => c.slug === 'pizza');
    const burgerCat = createdCategories.find(c => c.slug === 'burgers');
    const sushiCat = createdCategories.find(c => c.slug === 'sushi');
    const indianCat = createdCategories.find(c => c.slug === 'indian');
    const dessertCat = createdCategories.find(c => c.slug === 'desserts');

    // Create restaurants
    const restaurants = [
      {
        name: 'Bella Napoli Pizzeria',
        description: 'Authentic Neapolitan pizza made with imported ingredients',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600',
        coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200',
        categories: [pizzaCat._id],
        cuisine: ['Italian', 'Pizza'],
        address: { street: '123 Main St', city: 'New York', state: 'NY', zipCode: '10001' },
        contact: { phone: '+1-555-0101', email: 'info@bellanapoli.com' },
        rating: { average: 4.7, count: 342 },
        deliveryInfo: { time: '25-35 min', fee: 2.99, minOrder: 15, freeDeliveryAbove: 40 },
        tags: ['pizza', 'italian', 'authentic'],
        isActive: true, isFeatured: true, isPremium: true,
        owner: admin._id, totalOrders: 1250
      },
      {
        name: 'The Burger Lab',
        description: 'Craft burgers with premium ingredients and unique flavor combinations',
        image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600',
        coverImage: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200',
        categories: [burgerCat._id],
        cuisine: ['American', 'Burgers'],
        address: { street: '456 Oak Ave', city: 'Los Angeles', state: 'CA', zipCode: '90001' },
        contact: { phone: '+1-555-0102', email: 'contact@burgerlab.com' },
        rating: { average: 4.5, count: 218 },
        deliveryInfo: { time: '20-30 min', fee: 1.99, minOrder: 10, freeDeliveryAbove: 30 },
        tags: ['burgers', 'american', 'craft'],
        isActive: true, isFeatured: true,
        owner: admin._id, totalOrders: 890
      },
      {
        name: 'Sakura Sushi Bar',
        description: 'Premium Japanese sushi and sashimi, fresh daily',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600',
        coverImage: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=1200',
        categories: [sushiCat._id],
        cuisine: ['Japanese', 'Sushi'],
        address: { street: '789 Cherry Blossom Ln', city: 'San Francisco', state: 'CA', zipCode: '94102' },
        contact: { phone: '+1-555-0103', email: 'reservations@sakurasushi.com' },
        rating: { average: 4.9, count: 567 },
        deliveryInfo: { time: '35-45 min', fee: 3.99, minOrder: 25, freeDeliveryAbove: 60 },
        tags: ['sushi', 'japanese', 'premium', 'fresh'],
        isActive: true, isFeatured: true, isPremium: true,
        owner: admin._id, totalOrders: 2100
      },
      {
        name: 'Spice Garden',
        description: 'Authentic Indian cuisine with aromatic spices and traditional recipes',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600',
        coverImage: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1200',
        categories: [indianCat._id],
        cuisine: ['Indian', 'Curry'],
        address: { street: '321 Curry Lane', city: 'Chicago', state: 'IL', zipCode: '60601' },
        contact: { phone: '+1-555-0104', email: 'hello@spicegarden.com' },
        rating: { average: 4.6, count: 423 },
        deliveryInfo: { time: '30-40 min', fee: 2.49, minOrder: 15, freeDeliveryAbove: 35 },
        tags: ['indian', 'curry', 'spicy', 'vegetarian-friendly'],
        isActive: true, isFeatured: true,
        owner: admin._id, totalOrders: 1560
      },
      {
        name: 'Sweet Bliss Bakery',
        description: 'Artisan desserts, pastries and cakes baked fresh every morning',
        image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600',
        coverImage: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1200',
        categories: [dessertCat._id],
        cuisine: ['Desserts', 'Bakery'],
        address: { street: '654 Sugar St', city: 'Miami', state: 'FL', zipCode: '33101' },
        contact: { phone: '+1-555-0105', email: 'sweet@blissbakery.com' },
        rating: { average: 4.8, count: 289 },
        deliveryInfo: { time: '20-25 min', fee: 1.49, minOrder: 10, freeDeliveryAbove: 25 },
        tags: ['desserts', 'bakery', 'sweet', 'cakes'],
        isActive: true, isFeatured: false,
        owner: admin._id, totalOrders: 720
      }
    ];

    const createdRestaurants = await Restaurant.create(restaurants);
    console.log('🍽️  Restaurants created');

    const bellaNapoli = createdRestaurants[0];
    const burgerLab = createdRestaurants[1];
    const sakuraSushi = createdRestaurants[2];
    const spiceGarden = createdRestaurants[3];
    const sweetBliss = createdRestaurants[4];

    // Create food items
    const foodItems = [
      // Bella Napoli
      { name: 'Margherita Pizza', description: 'Classic tomato sauce, fresh mozzarella, basil', price: 16.99, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400', restaurant: bellaNapoli._id, category: pizzaCat._id, isVeg: true, isBestseller: true, isFeatured: true, rating: { average: 4.8, count: 120 }, tags: ['vegetarian', 'classic', 'cheese'], totalOrders: 450 },
      { name: 'Pepperoni Supreme', description: 'Double pepperoni, spicy sausage, roasted peppers', price: 19.99, discountedPrice: 17.99, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400', restaurant: bellaNapoli._id, category: pizzaCat._id, isBestseller: true, rating: { average: 4.7, count: 98 }, tags: ['meat', 'spicy', 'pepperoni'], totalOrders: 380 },
      { name: 'Truffle Mushroom Pizza', description: 'Truffle cream, wild mushrooms, parmesan, arugula', price: 22.99, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400', restaurant: bellaNapoli._id, category: pizzaCat._id, isVeg: true, isFeatured: true, rating: { average: 4.9, count: 67 }, tags: ['truffle', 'mushroom', 'premium', 'vegetarian'], totalOrders: 200 },
      { name: 'BBQ Chicken Pizza', description: 'Smoky BBQ sauce, grilled chicken, red onion, cilantro', price: 18.99, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400', restaurant: bellaNapoli._id, category: pizzaCat._id, rating: { average: 4.6, count: 89 }, tags: ['bbq', 'chicken', 'smoky'], totalOrders: 290 },

      // Burger Lab
      { name: 'Classic Smash Burger', description: 'Double smashed patty, American cheese, pickles, special sauce', price: 13.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', restaurant: burgerLab._id, category: burgerCat._id, isBestseller: true, isFeatured: true, rating: { average: 4.7, count: 156 }, tags: ['classic', 'smash', 'cheese'], totalOrders: 520 },
      { name: 'Mushroom Swiss Burger', description: 'Sautéed mushrooms, Swiss cheese, garlic aioli, brioche bun', price: 15.99, image: 'https://images.unsplash.com/photo-1590715176608-c8e25038c2f2?w=400', restaurant: burgerLab._id, category: burgerCat._id, rating: { average: 4.5, count: 87 }, tags: ['mushroom', 'swiss', 'gourmet'], totalOrders: 230 },
      { name: 'Crispy Chicken Sandwich', description: 'Buttermilk fried chicken, coleslaw, hot sauce, pickles', price: 14.99, image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400', restaurant: burgerLab._id, category: burgerCat._id, isBestseller: true, rating: { average: 4.8, count: 203 }, tags: ['chicken', 'crispy', 'fried'], totalOrders: 610 },
      { name: 'Veggie Avocado Burger', description: 'Black bean patty, fresh avocado, tomato, lettuce, vegan mayo', price: 13.99, image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400', restaurant: burgerLab._id, category: burgerCat._id, isVeg: true, isVegan: true, rating: { average: 4.4, count: 54 }, tags: ['vegan', 'avocado', 'healthy'], totalOrders: 145 },

      // Sakura Sushi
      { name: 'Dragon Roll', description: 'Shrimp tempura, cucumber, topped with avocado and eel sauce', price: 18.99, image: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400', restaurant: sakuraSushi._id, category: sushiCat._id, isBestseller: true, isFeatured: true, rating: { average: 4.9, count: 234 }, tags: ['roll', 'shrimp', 'avocado'], totalOrders: 780 },
      { name: 'Salmon Sashimi (8pc)', description: 'Premium Atlantic salmon, fresh wasabi, pickled ginger', price: 24.99, image: 'https://images.unsplash.com/photo-1564489563601-c53cfc451e93?w=400', restaurant: sakuraSushi._id, category: sushiCat._id, isBestseller: true, rating: { average: 4.9, count: 189 }, tags: ['sashimi', 'salmon', 'premium'], totalOrders: 560 },
      { name: 'Rainbow Roll', description: 'California roll topped with assorted fish', price: 21.99, image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400', restaurant: sakuraSushi._id, category: sushiCat._id, isFeatured: true, rating: { average: 4.8, count: 145 }, tags: ['roll', 'mixed', 'colorful'], totalOrders: 430 },

      // Spice Garden
      { name: 'Butter Chicken', description: 'Tender chicken in rich, creamy tomato sauce with aromatic spices', price: 16.99, discountedPrice: 14.99, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400', restaurant: spiceGarden._id, category: indianCat._id, isBestseller: true, isFeatured: true, spiceLevel: 'medium', rating: { average: 4.8, count: 312 }, tags: ['curry', 'chicken', 'creamy', 'popular'], totalOrders: 920 },
      { name: 'Paneer Tikka Masala', description: 'Cottage cheese in spiced tomato-cream gravy', price: 15.99, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400', restaurant: spiceGarden._id, category: indianCat._id, isVeg: true, isBestseller: true, spiceLevel: 'medium', rating: { average: 4.7, count: 198 }, tags: ['vegetarian', 'paneer', 'curry'], totalOrders: 540 },
      { name: 'Lamb Biryani', description: 'Fragrant basmati rice with slow-cooked spiced lamb', price: 19.99, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400', restaurant: spiceGarden._id, category: indianCat._id, isFeatured: true, spiceLevel: 'hot', rating: { average: 4.9, count: 156 }, tags: ['biryani', 'lamb', 'rice', 'aromatic'], totalOrders: 380 },

      // Sweet Bliss
      { name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with molten center, vanilla ice cream', price: 8.99, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400', restaurant: sweetBliss._id, category: dessertCat._id, isVeg: true, isBestseller: true, isFeatured: true, rating: { average: 4.9, count: 267 }, tags: ['chocolate', 'warm', 'ice cream', 'decadent'], totalOrders: 650 },
      { name: 'New York Cheesecake', description: 'Classic creamy cheesecake with graham cracker crust', price: 7.99, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400', restaurant: sweetBliss._id, category: dessertCat._id, isVeg: true, isBestseller: true, rating: { average: 4.8, count: 189 }, tags: ['cheesecake', 'creamy', 'classic'], totalOrders: 420 },
      { name: 'Tiramisu', description: 'Italian classic with mascarpone, espresso-soaked ladyfingers', price: 8.49, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400', restaurant: sweetBliss._id, category: dessertCat._id, isVeg: true, rating: { average: 4.7, count: 134 }, tags: ['italian', 'coffee', 'creamy', 'classic'], totalOrders: 310 }
    ];

    await FoodItem.insertMany(foodItems);
    console.log('🍕 Food items created');

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📋 Test Credentials:');
    console.log('   Admin: admin@feastrush.com / admin123');
    console.log('   User:  user@feastrush.com / user123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDB();
