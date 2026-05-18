import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  { name: 'Sarah Chen', role: 'Food Blogger', avatar: 'S', rating: 5, text: 'FeastRush has completely changed how I order food. The UI is stunning, delivery is always on time, and the food quality is consistently excellent.', location: 'New York, NY' },
  { name: 'Marcus Williams', role: 'Software Engineer', avatar: 'M', rating: 5, text: 'The app is super intuitive. I love how I can filter by cuisine and dietary preferences. The order tracking is so smooth and accurate!', location: 'San Francisco, CA' },
  { name: 'Priya Patel', role: 'Marketing Manager', avatar: 'P', rating: 5, text: 'Best food delivery platform I\'ve used. The restaurant variety is amazing, prices are fair, and the customer service is exceptional.', location: 'Chicago, IL' },
  { name: 'James Rodriguez', role: 'Chef & Foodie', avatar: 'J', rating: 5, text: 'As a chef, I\'m picky about food quality. FeastRush consistently delivers restaurant-quality food to my door. Absolutely love it!', location: 'Miami, FL' },
  { name: 'Emma Thompson', role: 'Nutritionist', avatar: 'E', rating: 5, text: 'The healthy food options and clear nutritional information make this my go-to app. The dark mode is gorgeous too!', location: 'Los Angeles, CA' },
  { name: 'David Kim', role: 'Student', avatar: 'D', rating: 5, text: 'Great deals for students and the delivery speed is unmatched. I\'ve tried every food app and FeastRush wins every time.', location: 'Austin, TX' },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title mb-3"
          >
            Loved by Thousands
          </motion.h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it — here's what our happy customers say
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-6 hover:shadow-card-hover transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-primary-500 to-teal-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-glow">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}</p>
                  </div>
                </div>
                <Quote className="w-6 h-6 text-primary-300 dark:text-primary-700" />
              </div>

              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{t.text}</p>
              <p className="text-xs text-gray-400 dark:text-gray-600 mt-4">📍 {t.location}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
