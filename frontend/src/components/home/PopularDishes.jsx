import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Plus, Flame } from 'lucide-react';
import { foodAPI } from '../../api/axios';
import { getPopularDishes } from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

export default function PopularDishes() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    foodAPI.getPopular()
      .then(({ data }) => setDishes(data.data?.length ? data.data : getPopularDishes()))
      .catch(() => setDishes(getPopularDishes()))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
            <Flame className="w-3.5 h-3.5 text-red-500" />
          </div>
          <span className="text-sm font-semibold text-red-500">Bestsellers</span>
        </div>
        <div className="flex items-end justify-between mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Popular Dishes
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-36 bg-gray-200 dark:bg-gray-700 rounded-2xl mb-3" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              </div>
            ))
            : dishes.slice(0, 12).map((dish, i) => (
              <motion.div
                key={dish._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl mb-3 cursor-pointer"
                  onClick={() => addToCart(dish._id, 1)}>
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-36 object-cover group-hover:scale-110 transition-transform duration-400"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200'; }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Quick add button */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => { e.stopPropagation(); addToCart(dish._id, 1); }}
                    className="absolute bottom-2 right-2 w-8 h-8 bg-primary-600 hover:bg-primary-700 text-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {dish.isVeg && (
                      <span className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
                        <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                      </span>
                    )}
                    {dish.isBestseller && (
                      <span className="px-1.5 py-0.5 bg-yellow-400 text-yellow-900 text-xs font-bold rounded">🔥</span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">{dish.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{dish.restaurant?.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <div>
                      {dish.discountedPrice ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-primary-600 dark:text-primary-400 font-bold text-sm">${dish.discountedPrice}</span>
                          <span className="text-gray-400 text-xs line-through">${dish.price}</span>
                        </div>
                      ) : (
                        <span className="text-primary-600 dark:text-primary-400 font-bold text-sm">${dish.price}</span>
                      )}
                    </div>
                    <span className="flex items-center gap-0.5 text-yellow-500 text-xs">
                      <Star className="w-3 h-3 fill-current" />
                      {dish.rating?.average?.toFixed(1) || '4.5'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
