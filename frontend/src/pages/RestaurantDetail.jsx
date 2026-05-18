import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Clock, Truck, MapPin, ChevronLeft, Plus, Minus, Heart, Share2, Leaf } from 'lucide-react';
import { restaurantAPI, categoryAPI } from '../api/axios';
import { getRestaurantById, getMenuByRestaurant } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../api/axios';
import toast from 'react-hot-toast';

export default function RestaurantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isFavorited, setIsFavorited] = useState(false);
  const [quantities, setQuantities] = useState({});
  const { addToCart, cart } = useCart();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    Promise.all([restaurantAPI.getById(id), restaurantAPI.getMenu(id)])
      .then(([rRes, mRes]) => {
        setRestaurant(rRes.data.data);
        setMenu(mRes.data.data || []);
        if (user?.favorites?.includes(id)) setIsFavorited(true);
      })
      .catch(() => {
        // Fall back to mock data
        const mockR = getRestaurantById(id);
        const mockM = getMenuByRestaurant(id);
        if (mockR) {
          setRestaurant(mockR);
          setMenu(mockM);
        } else {
          toast.error('Restaurant not found');
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  const categories = ['all', ...new Set(menu.map(item => item.category?.name).filter(Boolean))];

  const filteredMenu = activeCategory === 'all' ? menu : menu.filter(item => item.category?.name === activeCategory);

  const getCartQty = (foodId) => {
    const cartItem = cart?.items?.find(i => i.foodItem?._id === foodId || i.foodItem === foodId);
    return cartItem?.quantity || 0;
  };

  const handleAdd = async (foodId) => {
    await addToCart(foodId, 1);
  };

  const handleFavorite = async () => {
    if (!isAuthenticated) { toast.error('Please login first'); return; }
    try {
      const { data } = await authAPI.toggleFavorite(id);
      setIsFavorited(data.isFavorited);
      toast.success(data.message);
    } catch { toast.error('Failed to update favorites'); }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="h-64 bg-gray-200 dark:bg-gray-800 animate-pulse" />
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!restaurant) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero / Cover Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={restaurant.coverImage || restaurant.image} alt={restaurant.name}
          className="w-full h-full object-cover" onError={(e) => { e.target.src = restaurant.image; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Back button */}
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 flex items-center gap-2 text-white bg-black/30 backdrop-blur-sm px-3 py-2 rounded-xl hover:bg-black/50 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <div className="absolute top-4 right-4 flex gap-2">
          <button onClick={handleFavorite}
            className={`p-2.5 rounded-xl backdrop-blur-sm transition-all ${isFavorited ? 'bg-red-500 text-white' : 'bg-black/30 text-white hover:bg-black/50'}`}>
            <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
          <button className="p-2.5 bg-black/30 backdrop-blur-sm text-white rounded-xl hover:bg-black/50 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Restaurant info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-6xl mx-auto flex items-end gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-xl flex-shrink-0">
              <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200'; }} />
            </div>
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-black text-white">{restaurant.name}</h1>
              <p className="text-gray-300 text-sm">{restaurant.cuisine?.join(' • ')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Info bar */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 mb-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex flex-wrap gap-5 items-center">
            <div className="flex items-center gap-1.5">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="font-bold text-gray-900 dark:text-white">{restaurant.rating?.average?.toFixed(1)}</span>
              <span className="text-gray-500 text-sm">({restaurant.rating?.count} reviews)</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
              <Clock className="w-4 h-4 text-teal-500" />
              <span className="text-sm">{restaurant.deliveryInfo?.time}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
              <Truck className="w-4 h-4 text-primary-500" />
              <span className="text-sm">
                {restaurant.deliveryInfo?.fee === 0 ? 'Free delivery' : `$${restaurant.deliveryInfo?.fee} delivery`}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
              <MapPin className="w-4 h-4 text-red-400" />
              <span className="text-sm">{restaurant.address?.city}, {restaurant.address?.state}</span>
            </div>
            <div className={`ml-auto px-3 py-1.5 rounded-xl text-sm font-semibold ${restaurant.isOpen ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
              {restaurant.isOpen ? '● Open Now' : '● Closed'}
            </div>
          </div>
          {restaurant.description && <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">{restaurant.description}</p>}
        </div>

        {/* Offers */}
        {restaurant.offers?.length > 0 && (
          <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
            {restaurant.offers.map((offer, i) => (
              <div key={i} className="flex-shrink-0 bg-gradient-to-r from-teal-600 to-teal-700 text-white px-4 py-2.5 rounded-xl text-sm">
                <span className="font-bold">{offer.title}</span>
                {offer.code && <span className="ml-2 text-teal-200">| Use: {offer.code}</span>}
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-6">
          {/* Sticky category nav */}
          <div className="hidden lg:block w-52 flex-shrink-0">
            <div className="sticky top-20 bg-white dark:bg-gray-900 rounded-2xl p-3 border border-gray-100 dark:border-gray-800 shadow-sm">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Menu</p>
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeCategory === cat ? 'bg-primary-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                  {cat === 'all' ? 'All Items' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Menu items */}
          <div className="flex-1">
            {/* Mobile category tabs */}
            <div className="lg:hidden flex gap-2 mb-5 overflow-x-auto pb-2">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeCategory === cat ? 'bg-primary-600 text-white' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'}`}>
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredMenu.map((item, i) => {
                const cartQty = getCartQty(item._id);
                return (
                  <motion.div key={item._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all flex gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-1">
                        {item.isVeg ? (
                          <span className="w-4 h-4 border-2 border-green-500 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="w-2 h-2 bg-green-500 rounded-full" />
                          </span>
                        ) : (
                          <span className="w-4 h-4 border-2 border-red-500 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="w-2 h-2 bg-red-500 rounded-full" />
                          </span>
                        )}
                        <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                        {item.isBestseller && <span className="px-1.5 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs font-bold rounded">Bestseller</span>}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">{item.description}</p>
                      <div className="flex items-center gap-3">
                        <div>
                          {item.discountedPrice ? (
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-primary-600 dark:text-primary-400">${item.discountedPrice}</span>
                              <span className="text-sm text-gray-400 line-through">${item.price}</span>
                            </div>
                          ) : (
                            <span className="font-bold text-gray-900 dark:text-white">${item.price}</span>
                          )}
                        </div>
                        {item.rating?.average > 0 && (
                          <span className="flex items-center gap-0.5 text-yellow-500 text-xs">
                            <Star className="w-3 h-3 fill-current" />{item.rating.average.toFixed(1)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-between flex-shrink-0">
                      <div className="relative w-28 h-24 rounded-xl overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200'; }}
                          loading="lazy" />
                      </div>
                      <div className="mt-2">
                        {cartQty === 0 ? (
                          <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleAdd(item._id)}
                            disabled={!item.isAvailable}
                            className="flex items-center gap-1.5 px-4 py-1.5 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition-colors">
                            <Plus className="w-3.5 h-3.5" /> Add
                          </motion.button>
                        ) : (
                          <div className="flex items-center gap-1 bg-primary-600 rounded-lg">
                            <button onClick={() => handleAdd(item._id)} className="px-2 py-1.5 text-white hover:bg-primary-700 transition-colors rounded-l-lg">
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-6 text-center text-white text-sm font-bold">{cartQty}</span>
                            <button onClick={() => handleAdd(item._id)} className="px-2 py-1.5 text-white hover:bg-primary-700 transition-colors rounded-r-lg">
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {filteredMenu.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-5xl mb-4">🍽️</div>
                  <p className="text-gray-500">No items in this category</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
