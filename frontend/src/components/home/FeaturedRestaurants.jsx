import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, Truck, ArrowRight, Zap } from 'lucide-react';
import { restaurantAPI } from '../../api/axios';
import { getFeaturedRestaurants } from '../../data/mockData';

const SkeletonCard = () => (
  <div className="card animate-pulse">
    <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-t-2xl" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
    </div>
  </div>
);

export default function FeaturedRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    restaurantAPI.getFeatured()
      .then(({ data }) => setRestaurants(data.data?.length ? data.data : getFeaturedRestaurants()))
      .catch(() => setRestaurants(getFeaturedRestaurants()))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-2"
            >
              <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
              </div>
              <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">Top Picks</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title"
            >
              Featured Restaurants
            </motion.h2>
          </div>
          <Link to="/restaurants" className="hidden md:flex items-center gap-1.5 text-primary-600 dark:text-primary-400 font-semibold hover:gap-3 transition-all text-sm">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : restaurants.map((restaurant, i) => (
              <motion.div
                key={restaurant._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/restaurants/${restaurant._id}`} className="block group">
                  <div className="card overflow-hidden hover:-translate-y-1 transition-all duration-300">
                    {/* Image */}
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400'; }}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        {restaurant.isPremium && (
                          <span className="px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-lg">Premium</span>
                        )}
                        {!restaurant.isOpen && (
                          <span className="px-2 py-1 bg-gray-800/80 text-white text-xs font-bold rounded-lg">Closed</span>
                        )}
                      </div>

                      {/* Offer badge */}
                      {restaurant.offers?.length > 0 && (
                        <div className="absolute bottom-3 left-3">
                          <span className="px-2 py-1 bg-teal-500 text-white text-xs font-bold rounded-lg">
                            {restaurant.offers[0].title || `${restaurant.offers[0].discount}% OFF`}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-display font-bold text-gray-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {restaurant.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                        {restaurant.cuisine?.join(' • ') || 'Various cuisines'}
                      </p>

                      <div className="flex items-center gap-3 mt-3 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1 text-yellow-500 font-semibold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          {restaurant.rating?.average?.toFixed(1) || '4.5'}
                          <span className="text-gray-400 font-normal">({restaurant.rating?.count || 0})</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {restaurant.deliveryInfo?.time || '30-40 min'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5" />
                          {restaurant.deliveryInfo?.fee === 0 ? 'Free' : `$${restaurant.deliveryInfo?.fee?.toFixed(2)}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link to="/restaurants" className="btn-outline text-sm">
            View All Restaurants
          </Link>
        </div>
      </div>
    </section>
  );
}
