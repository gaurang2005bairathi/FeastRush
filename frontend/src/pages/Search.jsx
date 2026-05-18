import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X, Star, Clock, Plus } from 'lucide-react';
import { restaurantAPI, foodAPI } from '../api/axios';
import { searchMockData } from '../data/mockData';
import { useCart } from '../context/CartContext';

export default function Search() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [tab, setTab] = useState('restaurants');
  const [restaurants, setRestaurants] = useState([]);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const { addToCart } = useCart();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 400);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery.trim()) { setRestaurants([]); setFoods([]); return; }
    setLoading(true);
    Promise.all([
      restaurantAPI.search(debouncedQuery)
        .then(r => setRestaurants(r.data.data?.length ? r.data.data : searchMockData(debouncedQuery).restaurants))
        .catch(() => setRestaurants(searchMockData(debouncedQuery).restaurants)),
      foodAPI.search(debouncedQuery)
        .then(r => setFoods(r.data.data?.length ? r.data.data : searchMockData(debouncedQuery).foods))
        .catch(() => setFoods(searchMockData(debouncedQuery).foods)),
    ]).finally(() => setLoading(false));
  }, [debouncedQuery]);

  const hasResults = restaurants.length > 0 || foods.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Search input */}
        <div className="relative mb-6">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for restaurants, dishes..."
            className="w-full pl-12 pr-12 py-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 text-base shadow-sm"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {query && (
          <>
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              {['restaurants', 'dishes'].map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all capitalize ${tab === t ? 'bg-primary-600 text-white' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'}`}>
                  {t} {t === 'restaurants' ? `(${restaurants.length})` : `(${foods.length})`}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-20 bg-white dark:bg-gray-900 rounded-2xl animate-pulse border border-gray-100 dark:border-gray-800" />
                ))}
              </div>
            ) : !hasResults ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No results for "{query}"</h3>
                <p className="text-gray-500">Try a different search term</p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {tab === 'restaurants' ? (
                  <motion.div key="restaurants" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                    {restaurants.map((r, i) => (
                      <motion.div key={r._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                        <Link to={`/restaurants/${r._id}`} className="flex gap-4 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                          <img src={r.image} alt={r.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100'; }} />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 dark:text-white truncate">{r.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{r.cuisine?.join(' · ')}</p>
                            <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                              <span className="flex items-center gap-0.5 text-yellow-500"><Star className="w-3 h-3 fill-current" />{r.rating?.average?.toFixed(1)}</span>
                              <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{r.deliveryInfo?.time}</span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div key="dishes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                    {foods.map((food, i) => (
                      <motion.div key={food._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                        className="flex gap-4 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <img src={food.image} alt={food.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100'; }} />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 dark:text-white truncate">{food.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{food.restaurant?.name}</p>
                          <p className="text-primary-600 dark:text-primary-400 font-bold text-sm mt-1">${food.discountedPrice || food.price}</p>
                        </div>
                        <button onClick={() => addToCart(food._id, 1)}
                          className="self-center w-9 h-9 bg-primary-600 hover:bg-primary-700 text-white rounded-xl flex items-center justify-center transition-colors flex-shrink-0">
                          <Plus className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </>
        )}

        {!query && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Search for something delicious</h3>
            <p className="text-gray-500">Try "pizza", "burger", "sushi" or your favorite restaurant</p>
          </div>
        )}
      </div>
    </div>
  );
}
