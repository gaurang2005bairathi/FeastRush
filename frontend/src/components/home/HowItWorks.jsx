import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ShoppingCart, Package, Smile } from 'lucide-react';

const steps = [
  { icon: MapPin, title: 'Choose Location', desc: 'Enter your delivery address to find restaurants near you', color: 'from-purple-500 to-purple-700', num: '01' },
  { icon: ShoppingCart, title: 'Select Your Food', desc: 'Browse menus, pick your favorites and customize your order', color: 'from-teal-500 to-teal-700', num: '02' },
  { icon: Package, title: 'Track Your Order', desc: 'Real-time tracking from kitchen to your doorstep', color: 'from-pink-500 to-pink-700', num: '03' },
  { icon: Smile, title: 'Enjoy Your Meal', desc: 'Fresh, hot food delivered right to your door. Bon appétit!', color: 'from-yellow-500 to-yellow-700', num: '04' },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-950 to-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'radial-gradient(circle, #7c3aed 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary-400 text-sm font-semibold mb-3 uppercase tracking-wider"
          >
            Simple Process
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-black text-white mb-4"
          >
            How FeastRush Works
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ordering your favorite food is just four simple steps away
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative text-center group"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-primary-600/50 to-transparent z-0" />
              )}

              <div className="relative z-10">
                <div className={`w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-2 left-1/2 translate-x-4 text-5xl font-black text-white/5 font-display select-none">
                  {step.num}
                </div>
                <h3 className="text-white font-display font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
