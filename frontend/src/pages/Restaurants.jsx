import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star, Clock, Truck, X, SlidersHorizontal } from 'lucide-react';
import { restaurantAPI, categoryAPI } from '../api/axios';
import { mockRestaurants, mockCategories } from '../data/mockData';

const SortOptions = [
  { value: '-rating.average', label: 'Top Rated' },
  { value: '-createdAt', label: 'Newest' },
  { value: 'deliveryInfo.fee', label: 'Delivery Fee' },
  { value: '-totalOrders', label: 'Most Popular' },
];

export default function Restaurants() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    sort: '-rating.average',
  });

  useEffect(() => {
    categoryAPI.getAll()
      .then(({ data }) => setCategories(data.data?.length ? data.data : mockCategories))
      .catch(() => setCategories(mockCategories));
  }, []);

  const fetchRestaurants = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 12, ...filters };
      Object.keys(params).forEach(k => !params[k] && delete params[k]);
      const { data } = await restaurantAPI.getAll(params);
      if (data.data?.length) {
        setRestaurants(data.data);
        setTotal(data.pagination?.total || 0);
      } else {
        throw new Error('no data');
      }
    } catch {
      // Use mock data with client-side filtering
      let filtered = mockRestaurants;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        filtered = filtered.filter(r =>
          r.name.toLowerCase().includes(q) ||
          r.cuisine.some(c => c.toLowerCase().includes(q))
        );
      }
      if (filters.category) {
        filtered = filtered.filter(r =>
          r.categories.some(c => c._id === filters.category)
        );
      }
      if (filters.sort === '-rating.average') filtered = [...filtered].sort((a, b) => b.rating.average - a.rating.average);
      if (filters.sort === '-totalOrders') filtered = [...filtered].sort((a, b) => b.totalOrders - a.totalOrders);
      if (filters.sort === 'deliveryInfo.fee') filtered = [...filtered].sort((a, b) => a.deliveryInfo.fee - b.deliveryInfo.fee);
      setRestaurants(filtered);
      setTotal(filtered.length);
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  useEffect(() => { fetchRestaurants(); }, [fetchRestaurants]);

  const updateFilter = (key, val) => {
    setFilters(prev => ({ ...prev, [key]: val }));
    setPage(1);
  };

  const clearFilters = () => setFilters({ search: '', category: '', sort: '-rating.average' });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="section-title mb-2">
            All Restaurants
          </motion.h1>
          <p className="text-gray-500 dark:text-gray-400">{total} restaurants available</p>
        </div>

        {/* Filters bar */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 mb-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => updateFilter('search', e.target.value)}
                placeholder="Search restaurants..."
                className="input pl-10 h-10 text-sm"
              />
            </div>

            {/* Sort */}
            <select
              value={filters.sort}
              onChange={(e) => updateFilter('sort', e.target.value)}
              className="input h-10 text-sm w-full sm:w-48"
            >
              {SortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>

            <button onClick={() => setShowFilters(v => !v)}
              className="flex items-center gap-2 px-4 h-10 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:border-primary-400 transition-colors">
              <SlidersHorizontal className="w-4 h-4" /> Filters
              {filters.category && <span className="w-2 h-2 bg-primary-500 rounded-full" />}
            </button>
          </div>

          {/* Category filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden">
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 mt-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Category</p>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => updateFilter('category', '')}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${!filters.category ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'}`}>
                      All
                    </button>
                    {categories.map(cat => (
                      <button key={cat._id} onClick={() => updateFilter('category', cat._id)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filters.category === cat._id ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'}`}>
                        {cat.emoji} {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-44 bg-gray-200 dark:bg-gray-700" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : restaurants.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No restaurants found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters</p>
            <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {restaurants.map((r, i) => (
              <motion.div key={r._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Link to={`/restaurants/${r._id}`} className="block group">
                  <div className="card hover:-translate-y-1 transition-all duration-300">
                    <div className="relative h-44 overflow-hidden">
                      <img src={r.image} alt={r.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400'; }}
                        loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      {r.isPremium && <span className="absolute top-3 left-3 px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-lg">Premium</span>}
                      {!r.isOpen && <div className="absolute inset-0 bg-black/50 flex items-center justify-center"><span className="text-white font-semibold">Closed</span></div>}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 dark:text-white truncate group-hover:text-primary-600 transition-colors">{r.name}</h3>
                      <p className="text-sm text-gray-500 mt-0.5 truncate">{r.cuisine?.join(' • ')}</p>
                      <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1 text-yellow-500 font-semibold">
                          <Star className="w-3.5 h-3.5 fill-current" />{r.rating?.average?.toFixed(1)} ({r.rating?.count})
                        </span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{r.deliveryInfo?.time}</span>
                        <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5" />
                          {r.deliveryInfo?.fee === 0 ? 'Free' : `$${r.deliveryInfo?.fee?.toFixed(2)}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
