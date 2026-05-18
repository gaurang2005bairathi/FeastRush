import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categoryAPI } from '../../api/axios';
import { mockCategories } from '../../data/mockData';

const fallbackCategories = mockCategories;

export default function CategorySlider() {
  const [categories, setCategories] = useState(fallbackCategories);
  const [active, setActive] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    categoryAPI.getAll()
      .then(({ data }) => { if (data.data?.length) setCategories(data.data); })
      .catch(() => setCategories(mockCategories));
  }, []);

  const handleClick = (cat) => {
    setActive(cat._id);
    navigate(`/restaurants?category=${cat._id}`);
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title mb-3"
          >
            What are you craving?
          </motion.h2>
          <p className="text-gray-500 dark:text-gray-400">Choose from our wide variety of cuisines</p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-8 gap-3 md:gap-4">
          {categories.map((cat, i) => (
            <motion.button
              key={cat._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              onClick={() => handleClick(cat)}
              className="group flex flex-col items-center gap-2 focus:outline-none"
            >
              <motion.div
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`relative w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                  active === cat._id
                    ? 'border-primary-500 shadow-glow'
                    : 'border-gray-100 dark:border-gray-800 group-hover:border-primary-300'
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-0.5 left-0 right-0 text-center text-lg leading-none">{cat.emoji}</span>
              </motion.div>
              <span className={`text-xs font-semibold text-center transition-colors ${
                active === cat._id
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-400 group-hover:text-primary-600'
              }`}>
                {cat.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
