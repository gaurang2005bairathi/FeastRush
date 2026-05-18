import React from 'react';
import { motion } from 'framer-motion';
import { Tag, Zap, Gift, Percent } from 'lucide-react';
import toast from 'react-hot-toast';

const offers = [
  {
    icon: Zap,
    title: 'First Order Free Delivery',
    description: 'Get free delivery on your first order. No minimum order required!',
    code: 'FIRST50',
    gradient: 'from-primary-600 to-primary-800',
    badge: 'New Users'
  },
  {
    icon: Percent,
    title: '30% Off on Weekends',
    description: 'Every Saturday and Sunday enjoy 30% off on orders above $25.',
    code: 'WEEKEND30',
    gradient: 'from-teal-600 to-teal-800',
    badge: 'Weekend Deal'
  },
  {
    icon: Gift,
    title: 'Refer & Earn $10',
    description: 'Refer a friend and both of you get $10 credit on your next order.',
    code: 'REFER10',
    gradient: 'from-accent-pink to-pink-800',
    badge: 'Referral'
  },
];

export default function OffersSection() {
  const copyCode = (code) => {
    navigator.clipboard.writeText(code).then(() => toast.success(`Code "${code}" copied!`));
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
            <Tag className="w-3.5 h-3.5 text-yellow-500" />
          </div>
          <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">Exclusive Offers</span>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title mb-10"
        >
          Deals Just For You
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer, i) => (
            <motion.div
              key={offer.code}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative bg-gradient-to-br ${offer.gradient} rounded-3xl p-6 text-white overflow-hidden group cursor-pointer`}
              onClick={() => copyCode(offer.code)}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <offer.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-xs font-bold rounded-full">
                    {offer.badge}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl mb-2">{offer.title}</h3>
                <p className="text-white/80 text-sm mb-5 leading-relaxed">{offer.description}</p>

                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/30 border-dashed">
                    <span className="font-mono font-bold text-sm tracking-wider">{offer.code}</span>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2.5 bg-white text-gray-900 font-semibold text-sm rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    Copy
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
