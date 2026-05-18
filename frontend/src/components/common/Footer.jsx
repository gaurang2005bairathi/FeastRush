import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Instagram, Twitter, Facebook, Mail, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const footerLinks = {
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Press', href: '#' },
  ],
  Support: [
    { label: 'Help Center', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
  Explore: [
    { label: 'Restaurants', href: '/restaurants' },
    { label: 'Popular Dishes', href: '/search' },
    { label: 'Offers', href: '#' },
    { label: 'Gift Cards', href: '#' },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success('Subscribed successfully!');
    setEmail('');
  };

  return (
    <footer className="bg-gray-950 text-gray-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-600 to-teal-500 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold text-white">FeastRush</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-gray-500">
              Premium food delivery at lightning speed. Order from the best restaurants and experience flavors from around the world.
            </p>
            {/* Newsletter */}
            <div>
              <p className="text-white text-sm font-semibold mb-3">Get exclusive offers</p>
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary-500 transition-colors"
                />
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </form>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm hover:text-primary-400 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} FeastRush. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[
              { Icon: Instagram, href: '#', label: 'Instagram' },
              { Icon: Twitter, href: '#', label: 'Twitter' },
              { Icon: Facebook, href: '#', label: 'Facebook' },
              { Icon: Mail, href: '#', label: 'Email' },
            ].map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                whileHover={{ y: -3 }}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-primary-600 transition-colors"
              >
                <Icon className="w-4 h-4 text-gray-400 hover:text-white" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
