export const mockCategories = [
  { _id: 'cat1', name: 'Pizza', emoji: '🍕', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300', slug: 'pizza' },
  { _id: 'cat2', name: 'Burgers', emoji: '🍔', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300', slug: 'burgers' },
  { _id: 'cat3', name: 'Sushi', emoji: '🍣', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300', slug: 'sushi' },
  { _id: 'cat4', name: 'Indian', emoji: '🍛', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300', slug: 'indian' },
  { _id: 'cat5', name: 'Chinese', emoji: '🥡', image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300', slug: 'chinese' },
  { _id: 'cat6', name: 'Desserts', emoji: '🍰', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300', slug: 'desserts' },
  { _id: 'cat7', name: 'Salads', emoji: '🥗', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300', slug: 'salads' },
  { _id: 'cat8', name: 'Tacos', emoji: '🌮', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300', slug: 'tacos' },
  { _id: 'cat9', name: 'Pasta', emoji: '🍝', image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=300', slug: 'pasta' },
  { _id: 'cat10', name: 'Drinks', emoji: '🥤', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300', slug: 'drinks' },
];

export const mockRestaurants = [
  {
    _id: 'r1',
    name: 'Bella Napoli Pizzeria',
    description: 'Authentic Neapolitan pizza made with imported Italian ingredients and wood-fired ovens.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600',
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200',
    cuisine: ['Italian', 'Pizza'],
    categories: [{ _id: 'cat1', name: 'Pizza', emoji: '🍕' }],
    address: { street: '123 Main St', city: 'New York', state: 'NY' },
    rating: { average: 4.7, count: 342 },
    deliveryInfo: { time: '25-35 min', fee: 2.99, minOrder: 15, freeDeliveryAbove: 40 },
    offers: [{ title: '20% OFF on orders above $30', code: 'PIZZA20' }],
    tags: ['pizza', 'italian', 'wood-fired'],
    isOpen: true, isFeatured: true, isPremium: true, isActive: true, totalOrders: 1250,
    operatingHours: { open: '11:00', close: '23:00' },
  },
  {
    _id: 'r2',
    name: 'The Burger Lab',
    description: 'Craft burgers with premium wagyu beef, house-made sauces and fresh brioche buns.',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600',
    coverImage: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200',
    cuisine: ['American', 'Burgers'],
    categories: [{ _id: 'cat2', name: 'Burgers', emoji: '🍔' }],
    address: { street: '456 Oak Ave', city: 'Los Angeles', state: 'CA' },
    rating: { average: 4.5, count: 218 },
    deliveryInfo: { time: '20-30 min', fee: 1.99, minOrder: 10, freeDeliveryAbove: 30 },
    offers: [{ title: 'Free fries on orders above $20', code: 'FRIES' }],
    tags: ['burgers', 'american', 'craft', 'wagyu'],
    isOpen: true, isFeatured: true, isPremium: false, isActive: true, totalOrders: 890,
    operatingHours: { open: '10:00', close: '24:00' },
  },
  {
    _id: 'r3',
    name: 'Sakura Sushi Bar',
    description: 'Premium omakase and à la carte Japanese sushi with fresh daily seafood deliveries.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600',
    coverImage: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=1200',
    cuisine: ['Japanese', 'Sushi'],
    categories: [{ _id: 'cat3', name: 'Sushi', emoji: '🍣' }],
    address: { street: '789 Cherry Blossom Ln', city: 'San Francisco', state: 'CA' },
    rating: { average: 4.9, count: 567 },
    deliveryInfo: { time: '35-45 min', fee: 3.99, minOrder: 25, freeDeliveryAbove: 60 },
    offers: [{ title: '15% OFF on first order', code: 'SUSHI15' }],
    tags: ['sushi', 'japanese', 'premium', 'omakase'],
    isOpen: true, isFeatured: true, isPremium: true, isActive: true, totalOrders: 2100,
    operatingHours: { open: '12:00', close: '22:30' },
  },
  {
    _id: 'r4',
    name: 'Spice Garden',
    description: 'Authentic North & South Indian cuisine with aromatic spices and traditional recipes passed down generations.',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600',
    coverImage: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1200',
    cuisine: ['Indian', 'Curry', 'Vegetarian'],
    categories: [{ _id: 'cat4', name: 'Indian', emoji: '🍛' }],
    address: { street: '321 Curry Lane', city: 'Chicago', state: 'IL' },
    rating: { average: 4.6, count: 423 },
    deliveryInfo: { time: '30-40 min', fee: 2.49, minOrder: 15, freeDeliveryAbove: 35 },
    offers: [{ title: 'Buy 2 curries get naan free', code: 'NAAN' }],
    tags: ['indian', 'curry', 'spicy', 'vegetarian-friendly', 'halal'],
    isOpen: true, isFeatured: true, isPremium: false, isActive: true, totalOrders: 1560,
    operatingHours: { open: '11:30', close: '22:00' },
  },
  {
    _id: 'r5',
    name: 'Sweet Bliss Bakery',
    description: 'Artisan pastries, cakes and desserts baked fresh every morning with premium ingredients.',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600',
    coverImage: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1200',
    cuisine: ['Desserts', 'Bakery', 'Café'],
    categories: [{ _id: 'cat6', name: 'Desserts', emoji: '🍰' }],
    address: { street: '654 Sugar St', city: 'Miami', state: 'FL' },
    rating: { average: 4.8, count: 289 },
    deliveryInfo: { time: '20-25 min', fee: 1.49, minOrder: 10, freeDeliveryAbove: 25 },
    offers: [],
    tags: ['desserts', 'bakery', 'cakes', 'pastries', 'coffee'],
    isOpen: true, isFeatured: false, isPremium: false, isActive: true, totalOrders: 720,
    operatingHours: { open: '07:00', close: '21:00' },
  },
  {
    _id: 'r6',
    name: 'Dragon Palace',
    description: 'Authentic Cantonese and Szechuan cuisine with bold flavors and traditional dim sum.',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600',
    coverImage: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=1200',
    cuisine: ['Chinese', 'Dim Sum', 'Asian'],
    categories: [{ _id: 'cat5', name: 'Chinese', emoji: '🥡' }],
    address: { street: '88 Dragon Rd', city: 'Seattle', state: 'WA' },
    rating: { average: 4.4, count: 198 },
    deliveryInfo: { time: '30-40 min', fee: 2.99, minOrder: 20, freeDeliveryAbove: 45 },
    offers: [{ title: '25% OFF on weekdays', code: 'WEEKDAY25' }],
    tags: ['chinese', 'dim sum', 'noodles', 'fried rice'],
    isOpen: true, isFeatured: true, isPremium: false, isActive: true, totalOrders: 634,
    operatingHours: { open: '11:00', close: '22:00' },
  },
  {
    _id: 'r7',
    name: 'Taco Fiesta',
    description: 'Street-style Mexican tacos, burritos and quesadillas with house-made salsas and guacamole.',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600',
    coverImage: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=1200',
    cuisine: ['Mexican', 'Tacos', 'Street Food'],
    categories: [{ _id: 'cat8', name: 'Tacos', emoji: '🌮' }],
    address: { street: '77 Fiesta Blvd', city: 'Austin', state: 'TX' },
    rating: { average: 4.6, count: 312 },
    deliveryInfo: { time: '20-30 min', fee: 0, minOrder: 12, freeDeliveryAbove: 0 },
    offers: [{ title: 'Free delivery always!', code: '' }],
    tags: ['mexican', 'tacos', 'burritos', 'street food', 'spicy'],
    isOpen: true, isFeatured: true, isPremium: false, isActive: true, totalOrders: 980,
    operatingHours: { open: '10:00', close: '23:00' },
  },
  {
    _id: 'r8',
    name: 'Green Bowl',
    description: 'Healthy poke bowls, grain bowls and salads packed with superfoods and house dressings.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600',
    coverImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200',
    cuisine: ['Healthy', 'Salads', 'Poke Bowls'],
    categories: [{ _id: 'cat7', name: 'Salads', emoji: '🥗' }],
    address: { street: '22 Wellness Way', city: 'Portland', state: 'OR' },
    rating: { average: 4.7, count: 156 },
    deliveryInfo: { time: '15-25 min', fee: 1.99, minOrder: 12, freeDeliveryAbove: 30 },
    offers: [],
    tags: ['healthy', 'vegan', 'gluten-free', 'poke', 'bowls'],
    isOpen: true, isFeatured: false, isPremium: false, isActive: true, totalOrders: 445,
    operatingHours: { open: '08:00', close: '21:00' },
  },
  {
    _id: 'r9',
    name: 'Pasta Paradise',
    description: 'Handmade fresh pasta, classic Italian risottos and thin-crust Roman pizzas.',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600',
    coverImage: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=1200',
    cuisine: ['Italian', 'Pasta', 'Risotto'],
    categories: [{ _id: 'cat9', name: 'Pasta', emoji: '🍝' }],
    address: { street: '44 Trattoria St', city: 'Boston', state: 'MA' },
    rating: { average: 4.5, count: 234 },
    deliveryInfo: { time: '25-35 min', fee: 2.49, minOrder: 18, freeDeliveryAbove: 40 },
    offers: [{ title: '10% OFF every Tuesday', code: 'PASTA10' }],
    tags: ['pasta', 'italian', 'risotto', 'fresh', 'homemade'],
    isOpen: true, isFeatured: false, isPremium: true, isActive: true, totalOrders: 560,
    operatingHours: { open: '12:00', close: '22:00' },
  },
  {
    _id: 'r10',
    name: 'The Grill House',
    description: 'Slow-smoked BBQ meats, gourmet steaks and grilled seafood with signature dry rubs.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600',
    coverImage: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=1200',
    cuisine: ['BBQ', 'Grills', 'American', 'Steakhouse'],
    categories: [{ _id: 'cat2', name: 'Burgers', emoji: '🍔' }],
    address: { street: '99 Smokey Ln', city: 'Nashville', state: 'TN' },
    rating: { average: 4.8, count: 478 },
    deliveryInfo: { time: '35-50 min', fee: 3.49, minOrder: 25, freeDeliveryAbove: 55 },
    offers: [{ title: 'Half rack ribs FREE on orders $60+', code: 'RIBS60' }],
    tags: ['bbq', 'steak', 'ribs', 'smoked', 'grills'],
    isOpen: true, isFeatured: true, isPremium: true, isActive: true, totalOrders: 1890,
    operatingHours: { open: '11:00', close: '23:00' },
  },
];

export const mockFoodItems = [
  // Bella Napoli Pizzeria (r1)
  { _id: 'f1', name: 'Margherita Pizza', description: 'San Marzano tomatoes, fresh buffalo mozzarella, basil, extra virgin olive oil', price: 16.99, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400', restaurant: { _id: 'r1', name: 'Bella Napoli Pizzeria', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200' }, category: { _id: 'cat1', name: 'Pizza', emoji: '🍕' }, isVeg: true, isBestseller: true, isFeatured: true, rating: { average: 4.8, count: 120 }, totalOrders: 450, spiceLevel: 'mild' },
  { _id: 'f2', name: 'Pepperoni Supreme', description: 'Double pepperoni, spicy Italian sausage, roasted red peppers, mozzarella', price: 19.99, discountedPrice: 17.99, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400', restaurant: { _id: 'r1', name: 'Bella Napoli Pizzeria', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200' }, category: { _id: 'cat1', name: 'Pizza', emoji: '🍕' }, isVeg: false, isBestseller: true, rating: { average: 4.7, count: 98 }, totalOrders: 380, spiceLevel: 'medium' },
  { _id: 'f3', name: 'Truffle Mushroom Pizza', description: 'Black truffle cream, wild mushrooms, parmesan, fresh arugula, lemon zest', price: 22.99, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400', restaurant: { _id: 'r1', name: 'Bella Napoli Pizzeria', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200' }, category: { _id: 'cat1', name: 'Pizza', emoji: '🍕' }, isVeg: true, isFeatured: true, rating: { average: 4.9, count: 67 }, totalOrders: 200, spiceLevel: 'mild' },
  { _id: 'f4', name: 'BBQ Chicken Pizza', description: 'Smoky BBQ sauce, grilled chicken, caramelized onions, jalapeños, cilantro', price: 18.99, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400', restaurant: { _id: 'r1', name: 'Bella Napoli Pizzeria', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200' }, category: { _id: 'cat1', name: 'Pizza', emoji: '🍕' }, isVeg: false, rating: { average: 4.6, count: 89 }, totalOrders: 290, spiceLevel: 'medium' },
  { _id: 'f5', name: 'Four Cheese Pizza', description: 'Mozzarella, gorgonzola, provolone, pecorino romano, drizzled with honey', price: 20.99, image: 'https://images.unsplash.com/photo-1548369937-47519962c11a?w=400', restaurant: { _id: 'r1', name: 'Bella Napoli Pizzeria', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200' }, category: { _id: 'cat1', name: 'Pizza', emoji: '🍕' }, isVeg: true, rating: { average: 4.8, count: 74 }, totalOrders: 220, spiceLevel: 'mild' },

  // The Burger Lab (r2)
  { _id: 'f6', name: 'Classic Smash Burger', description: 'Double wagyu smashed patty, American cheese, pickles, shredded lettuce, special sauce', price: 13.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', restaurant: { _id: 'r2', name: 'The Burger Lab', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200' }, category: { _id: 'cat2', name: 'Burgers', emoji: '🍔' }, isVeg: false, isBestseller: true, isFeatured: true, rating: { average: 4.7, count: 156 }, totalOrders: 520, spiceLevel: 'mild' },
  { _id: 'f7', name: 'Mushroom Swiss Burger', description: 'Sautéed wild mushrooms, Swiss cheese, garlic aioli, caramelized onions, brioche bun', price: 15.99, image: 'https://images.unsplash.com/photo-1590715176608-c8e25038c2f2?w=400', restaurant: { _id: 'r2', name: 'The Burger Lab', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200' }, category: { _id: 'cat2', name: 'Burgers', emoji: '🍔' }, isVeg: false, rating: { average: 4.5, count: 87 }, totalOrders: 230, spiceLevel: 'mild' },
  { _id: 'f8', name: 'Crispy Chicken Sandwich', description: 'Buttermilk fried chicken thigh, Nashville hot sauce, coleslaw, pickles, honey butter', price: 14.99, image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400', restaurant: { _id: 'r2', name: 'The Burger Lab', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200' }, category: { _id: 'cat2', name: 'Burgers', emoji: '🍔' }, isVeg: false, isBestseller: true, rating: { average: 4.8, count: 203 }, totalOrders: 610, spiceLevel: 'hot' },
  { _id: 'f9', name: 'Veggie Avocado Burger', description: 'Smashed black bean patty, fresh avocado, heirloom tomato, romaine, vegan chipotle mayo', price: 13.99, image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400', restaurant: { _id: 'r2', name: 'The Burger Lab', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200' }, category: { _id: 'cat2', name: 'Burgers', emoji: '🍔' }, isVeg: true, isVegan: true, rating: { average: 4.4, count: 54 }, totalOrders: 145, spiceLevel: 'mild' },
  { _id: 'f10', name: 'Truffle Parmesan Fries', description: 'Crispy shoestring fries, white truffle oil, grated parmesan, fresh rosemary, sea salt', price: 7.99, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400', restaurant: { _id: 'r2', name: 'The Burger Lab', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200' }, category: { _id: 'cat2', name: 'Burgers', emoji: '🍔' }, isVeg: true, isBestseller: true, rating: { average: 4.9, count: 234 }, totalOrders: 780, spiceLevel: 'mild' },

  // Sakura Sushi Bar (r3)
  { _id: 'f11', name: 'Dragon Roll', description: 'Shrimp tempura, cucumber inside — topped with avocado, tobiko, unagi sauce', price: 18.99, image: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400', restaurant: { _id: 'r3', name: 'Sakura Sushi Bar', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200' }, category: { _id: 'cat3', name: 'Sushi', emoji: '🍣' }, isVeg: false, isBestseller: true, isFeatured: true, rating: { average: 4.9, count: 234 }, totalOrders: 780, spiceLevel: 'mild' },
  { _id: 'f12', name: 'Salmon Sashimi (8pc)', description: 'Premium Atlantic salmon, freshly sliced, served with wasabi and pickled ginger', price: 24.99, image: 'https://images.unsplash.com/photo-1564489563601-c53cfc451e93?w=400', restaurant: { _id: 'r3', name: 'Sakura Sushi Bar', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200' }, category: { _id: 'cat3', name: 'Sushi', emoji: '🍣' }, isVeg: false, isBestseller: true, rating: { average: 4.9, count: 189 }, totalOrders: 560, spiceLevel: 'mild' },
  { _id: 'f13', name: 'Rainbow Roll', description: 'California roll base topped with tuna, salmon, yellowtail, avocado', price: 21.99, image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400', restaurant: { _id: 'r3', name: 'Sakura Sushi Bar', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200' }, category: { _id: 'cat3', name: 'Sushi', emoji: '🍣' }, isVeg: false, isFeatured: true, rating: { average: 4.8, count: 145 }, totalOrders: 430, spiceLevel: 'mild' },
  { _id: 'f14', name: 'Spicy Tuna Roll', description: 'Bluefin tuna, sriracha, cucumber, scallion, masago, sesame seeds', price: 16.99, image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400', restaurant: { _id: 'r3', name: 'Sakura Sushi Bar', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200' }, category: { _id: 'cat3', name: 'Sushi', emoji: '🍣' }, isVeg: false, rating: { average: 4.7, count: 112 }, totalOrders: 350, spiceLevel: 'hot' },

  // Spice Garden (r4)
  { _id: 'f15', name: 'Butter Chicken', description: 'Tender chicken in velvety tomato-cream sauce, aromatic spices, fenugreek leaves', price: 16.99, discountedPrice: 14.99, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400', restaurant: { _id: 'r4', name: 'Spice Garden', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200' }, category: { _id: 'cat4', name: 'Indian', emoji: '🍛' }, isVeg: false, isBestseller: true, isFeatured: true, rating: { average: 4.8, count: 312 }, totalOrders: 920, spiceLevel: 'medium' },
  { _id: 'f16', name: 'Paneer Tikka Masala', description: 'Grilled cottage cheese in spiced tomato-cream gravy, bell peppers, onions', price: 15.99, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400', restaurant: { _id: 'r4', name: 'Spice Garden', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200' }, category: { _id: 'cat4', name: 'Indian', emoji: '🍛' }, isVeg: true, isBestseller: true, rating: { average: 4.7, count: 198 }, totalOrders: 540, spiceLevel: 'medium' },
  { _id: 'f17', name: 'Lamb Biryani', description: 'Fragrant basmati rice layered with slow-cooked spiced lamb, saffron, fried onions', price: 19.99, image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400', restaurant: { _id: 'r4', name: 'Spice Garden', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200' }, category: { _id: 'cat4', name: 'Indian', emoji: '🍛' }, isVeg: false, isFeatured: true, rating: { average: 4.9, count: 156 }, totalOrders: 380, spiceLevel: 'hot' },
  { _id: 'f18', name: 'Dal Makhani', description: 'Slow-cooked black lentils in buttery tomato sauce, overnight simmered for rich flavor', price: 12.99, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400', restaurant: { _id: 'r4', name: 'Spice Garden', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200' }, category: { _id: 'cat4', name: 'Indian', emoji: '🍛' }, isVeg: true, rating: { average: 4.6, count: 134 }, totalOrders: 310, spiceLevel: 'mild' },

  // Sweet Bliss Bakery (r5)
  { _id: 'f19', name: 'Chocolate Lava Cake', description: 'Warm molten chocolate cake, vanilla bean ice cream, raspberry coulis, cocoa dust', price: 8.99, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400', restaurant: { _id: 'r5', name: 'Sweet Bliss Bakery', image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=200' }, category: { _id: 'cat6', name: 'Desserts', emoji: '🍰' }, isVeg: true, isBestseller: true, isFeatured: true, rating: { average: 4.9, count: 267 }, totalOrders: 650, spiceLevel: 'mild' },
  { _id: 'f20', name: 'New York Cheesecake', description: 'Classic creamy cheesecake, graham cracker crust, strawberry compote', price: 7.99, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400', restaurant: { _id: 'r5', name: 'Sweet Bliss Bakery', image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=200' }, category: { _id: 'cat6', name: 'Desserts', emoji: '🍰' }, isVeg: true, isBestseller: true, rating: { average: 4.8, count: 189 }, totalOrders: 420, spiceLevel: 'mild' },
  { _id: 'f21', name: 'Tiramisu', description: 'Italian classic with mascarpone cream, espresso-soaked savoiardi, cocoa powder', price: 8.49, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400', restaurant: { _id: 'r5', name: 'Sweet Bliss Bakery', image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=200' }, category: { _id: 'cat6', name: 'Desserts', emoji: '🍰' }, isVeg: true, rating: { average: 4.7, count: 134 }, totalOrders: 310, spiceLevel: 'mild' },

  // Dragon Palace (r6)
  { _id: 'f22', name: 'Dim Sum Basket (6pc)', description: 'Steamed shrimp har gow, pork siu mai, char siu bao — served with chili oil', price: 13.99, image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400', restaurant: { _id: 'r6', name: 'Dragon Palace', image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=200' }, category: { _id: 'cat5', name: 'Chinese', emoji: '🥡' }, isVeg: false, isBestseller: true, isFeatured: true, rating: { average: 4.6, count: 178 }, totalOrders: 490, spiceLevel: 'mild' },
  { _id: 'f23', name: 'Kung Pao Chicken', description: 'Wok-tossed chicken, peanuts, dried chilies, scallions in signature Szechuan sauce', price: 15.99, image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400', restaurant: { _id: 'r6', name: 'Dragon Palace', image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=200' }, category: { _id: 'cat5', name: 'Chinese', emoji: '🥡' }, isVeg: false, isBestseller: true, rating: { average: 4.5, count: 134 }, totalOrders: 360, spiceLevel: 'hot' },
  { _id: 'f24', name: 'Vegetable Fried Rice', description: 'Wok-fried jasmine rice, seasonal vegetables, egg, soy sauce, sesame oil', price: 11.99, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400', restaurant: { _id: 'r6', name: 'Dragon Palace', image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=200' }, category: { _id: 'cat5', name: 'Chinese', emoji: '🥡' }, isVeg: true, rating: { average: 4.3, count: 89 }, totalOrders: 240, spiceLevel: 'mild' },

  // Taco Fiesta (r7)
  { _id: 'f25', name: 'Street Tacos (3pc)', description: 'Carne asada or al pastor, corn tortillas, onion, cilantro, lime, house salsa verde', price: 12.99, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400', restaurant: { _id: 'r7', name: 'Taco Fiesta', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=200' }, category: { _id: 'cat8', name: 'Tacos', emoji: '🌮' }, isVeg: false, isBestseller: true, isFeatured: true, rating: { average: 4.8, count: 267 }, totalOrders: 730, spiceLevel: 'medium' },
  { _id: 'f26', name: 'Loaded Burrito', description: 'Flour tortilla stuffed with rice, beans, your choice of protein, cheese, sour cream, guac', price: 14.99, image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400', restaurant: { _id: 'r7', name: 'Taco Fiesta', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=200' }, category: { _id: 'cat8', name: 'Tacos', emoji: '🌮' }, isVeg: false, isBestseller: true, rating: { average: 4.7, count: 198 }, totalOrders: 560, spiceLevel: 'medium' },
  { _id: 'f27', name: 'Veggie Quesadilla', description: 'Grilled peppers, mushrooms, black beans, corn, pepper jack cheese, chipotle crema', price: 11.99, image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400', restaurant: { _id: 'r7', name: 'Taco Fiesta', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=200' }, category: { _id: 'cat8', name: 'Tacos', emoji: '🌮' }, isVeg: true, rating: { average: 4.5, count: 112 }, totalOrders: 290, spiceLevel: 'mild' },

  // Green Bowl (r8)
  { _id: 'f28', name: 'Salmon Poke Bowl', description: 'Sushi rice, fresh salmon, edamame, cucumber, avocado, mango, ponzu dressing', price: 17.99, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400', restaurant: { _id: 'r8', name: 'Green Bowl', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200' }, category: { _id: 'cat7', name: 'Salads', emoji: '🥗' }, isVeg: false, isBestseller: true, isFeatured: true, rating: { average: 4.8, count: 143 }, totalOrders: 410, spiceLevel: 'mild' },
  { _id: 'f29', name: 'Superfood Salad', description: 'Kale, quinoa, roasted sweet potato, cranberries, walnuts, tahini lemon dressing', price: 14.99, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', restaurant: { _id: 'r8', name: 'Green Bowl', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200' }, category: { _id: 'cat7', name: 'Salads', emoji: '🥗' }, isVeg: true, isVegan: true, isGlutenFree: true, rating: { average: 4.6, count: 98 }, totalOrders: 260, spiceLevel: 'mild' },

  // Pasta Paradise (r9)
  { _id: 'f30', name: 'Cacio e Pepe', description: 'Handmade tonnarelli pasta, Pecorino Romano, Parmigiano Reggiano, cracked black pepper', price: 17.99, image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=400', restaurant: { _id: 'r9', name: 'Pasta Paradise', image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=200' }, category: { _id: 'cat9', name: 'Pasta', emoji: '🍝' }, isVeg: true, isBestseller: true, isFeatured: true, rating: { average: 4.8, count: 167 }, totalOrders: 470, spiceLevel: 'mild' },
  { _id: 'f31', name: 'Seafood Linguine', description: 'Fresh linguine, tiger prawns, clams, mussels, squid, white wine garlic sauce', price: 24.99, image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400', restaurant: { _id: 'r9', name: 'Pasta Paradise', image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=200' }, category: { _id: 'cat9', name: 'Pasta', emoji: '🍝' }, isVeg: false, isBestseller: true, rating: { average: 4.9, count: 134 }, totalOrders: 380, spiceLevel: 'mild' },

  // The Grill House (r10)
  { _id: 'f32', name: 'Smoked Baby Back Ribs', description: 'Slow-smoked 6 hours with hickory, dry-rubbed, glazed with house BBQ sauce, coleslaw', price: 29.99, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400', restaurant: { _id: 'r10', name: 'The Grill House', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=200' }, category: { _id: 'cat2', name: 'Burgers', emoji: '🍔' }, isVeg: false, isBestseller: true, isFeatured: true, rating: { average: 4.9, count: 378 }, totalOrders: 920, spiceLevel: 'medium' },
  { _id: 'f33', name: 'Ribeye Steak (12oz)', description: 'Prime cut ribeye, herb butter, garlic mashed potatoes, grilled asparagus, red wine jus', price: 42.99, image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400', restaurant: { _id: 'r10', name: 'The Grill House', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=200' }, category: { _id: 'cat2', name: 'Burgers', emoji: '🍔' }, isVeg: false, isFeatured: true, rating: { average: 4.9, count: 289 }, totalOrders: 670, spiceLevel: 'mild' },
  { _id: 'f34', name: 'Grilled Salmon Fillet', description: 'Atlantic salmon, lemon caper butter, wild rice pilaf, broccolini, dill aioli', price: 26.99, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400', restaurant: { _id: 'r10', name: 'The Grill House', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=200' }, category: { _id: 'cat2', name: 'Burgers', emoji: '🍔' }, isVeg: false, rating: { average: 4.7, count: 167 }, totalOrders: 420, spiceLevel: 'mild' },
];

// Helper to filter by search query
export const searchMockData = (query) => {
  const q = query.toLowerCase();
  const restaurants = mockRestaurants.filter(r =>
    r.name.toLowerCase().includes(q) ||
    r.cuisine.some(c => c.toLowerCase().includes(q)) ||
    r.tags.some(t => t.toLowerCase().includes(q))
  );
  const foods = mockFoodItems.filter(f =>
    f.name.toLowerCase().includes(q) ||
    (f.description && f.description.toLowerCase().includes(q)) ||
    (f.category?.name && f.category.name.toLowerCase().includes(q))
  );
  return { restaurants, foods };
};

export const getFeaturedRestaurants = () => mockRestaurants.filter(r => r.isFeatured);
export const getPopularDishes = () => mockFoodItems.filter(f => f.isBestseller).sort((a, b) => b.totalOrders - a.totalOrders);
export const getRestaurantById = (id) => mockRestaurants.find(r => r._id === id);
export const getMenuByRestaurant = (id) => mockFoodItems.filter(f => f.restaurant._id === id);
