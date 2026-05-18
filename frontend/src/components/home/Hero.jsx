import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Star, Clock, Truck, ArrowRight } from 'lucide-react';

const floatingCards = [
  { image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=120', name: 'Margherita', price: '$16.99', rating: 4.8, delay: 0 },
  { image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=120', name: 'Smash Burger', price: '$13.99', rating: 4.7, delay: 1 },
  { image: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=120', name: 'Dragon Roll', price: '$18.99', rating: 4.9, delay: 2 },
  { image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=120', name: 'Butter Chicken', price: '$16.99', rating: 4.8, delay: 0.5 },
];

const stats = [
  { icon: Star, value: '50K+', label: 'Reviews' },
  { icon: Truck, value: '30 min', label: 'Avg Delivery' },
  { icon: Clock, value: '24/7', label: 'Available' },
];

export default function Hero() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query)}`);
    else navigate('/restaurants');
  };

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-br from-gray-950 via-primary-950 to-gray-950">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-600/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-accent-pink/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'radial-gradient(circle, #7c3aed 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-600/20 border border-primary-500/30 text-primary-300 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
                Premium food delivery platform
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6"
            >
              Order Food{' '}
              <span className="gradient-text">Faster</span>{' '}
              Than Ever
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8 max-w-xl"
            >
              Discover top-rated restaurants near you. From street food to fine dining — delivered to your door in minutes.
            </motion.p>

            {/* Search bar */}
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onSubmit={handleSearch}
              className="relative flex gap-2 mb-10"
            >
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search restaurants or dishes..."
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-base"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="px-6 py-4 bg-gradient-to-r from-primary-600 to-teal-600 text-white font-semibold rounded-2xl hover:shadow-glow transition-all"
              >
                Search
              </motion.button>
            </motion.form>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <motion.a
                href="/restaurants"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-2xl shadow-glow hover:shadow-xl transition-all"
              >
                Explore Restaurants <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="/search"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all"
              >
                Browse Dishes
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-8"
            >
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-display font-black text-white">{value}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Floating Food Cards */}
          <div className="hidden lg:block relative h-[500px]">
            {floatingCards.map((card, i) => (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -15, 0],
                }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.3 + i * 0.15 },
                  scale: { duration: 0.6, delay: 0.3 + i * 0.15 },
                  y: { duration: 3 + card.delay, repeat: Infinity, ease: 'easeInOut', delay: card.delay },
                }}
                className={`absolute glass rounded-2xl p-3 shadow-xl cursor-pointer hover:scale-105 transition-transform ${
                  i === 0 ? 'top-8 left-4' :
                  i === 1 ? 'top-24 right-8' :
                  i === 2 ? 'bottom-16 left-16' :
                  'bottom-8 right-4'
                }`}
                style={{ maxWidth: '160px' }}
              >
                <img src={card.image} alt={card.name} className="w-full h-24 rounded-xl object-cover mb-2" />
                <p className="text-white text-xs font-semibold truncate">{card.name}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-primary-400 text-xs font-bold">{card.price}</span>
                  <span className="flex items-center gap-1 text-yellow-400 text-xs">
                    <Star className="w-3 h-3 fill-current" />{card.rating}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Center decoration */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-primary-500/20"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-teal-500/20"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-primary-600/30 to-teal-500/30 rounded-full blur-xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl">🍽️</div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z" fill="rgb(249 250 251)" className="dark:fill-gray-950" />
        </svg>
      </div>
    </section>
  );
}
