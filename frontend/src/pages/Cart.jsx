import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, updateItem, removeItem, clearCart } = useCart();
  const navigate = useNavigate();
  const tax = Math.round((cart?.subtotal || 0) * 0.05 * 100) / 100;

  if (!cart?.items?.length) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-8xl mb-6">🛒</motion.div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Add items from a restaurant to get started</p>
          <Link to="/restaurants" className="btn-primary">Browse Restaurants</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="section-title">Your Cart</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{cart.items.length} items</p>
          </div>
          <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-600 font-medium">Clear all</button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cart.items.map((item, i) => (
                <motion.div key={item._id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ delay: i * 0.05 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm flex gap-4">
                  <img src={item.foodItem?.image} alt={item.foodItem?.name}
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100'; }} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">{item.foodItem?.name}</h3>
                    <p className="text-primary-600 dark:text-primary-400 font-bold mt-1">${(item.totalPrice || item.price * item.quantity).toFixed(2)}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
                        <button onClick={() => item.quantity > 1 ? updateItem(item._id, item.quantity - 1) : removeItem(item._id)}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-bold text-gray-900 dark:text-white">{item.quantity}</span>
                        <button onClick={() => updateItem(item._id, item.quantity + 1)}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button onClick={() => removeItem(item._id)} className="p-2 text-red-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Coupon */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-teal-500" />
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Apply Coupon</h3>
                </div>
                <div className="flex gap-2">
                  <input placeholder="Enter code" className="input text-sm flex-1 h-10" />
                  <button className="px-4 h-10 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold rounded-xl transition-colors">Apply</button>
                </div>
              </div>

              {/* Bill */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Bill Summary</h3>
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span><span>${(cart?.subtotal || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Delivery fee</span><span>{(cart?.deliveryFee || 0) === 0 ? <span className="text-teal-600">Free</span> : `$${cart.deliveryFee.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Tax (5%)</span><span>${tax.toFixed(2)}</span>
                  </div>
                  {cart?.discount > 0 && (
                    <div className="flex justify-between text-teal-600">
                      <span>Discount</span><span>-${cart.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-gray-900 dark:text-white text-base pt-3 border-t border-gray-100 dark:border-gray-800">
                    <span>To Pay</span><span>${((cart?.subtotal || 0) + (cart?.deliveryFee || 0) - (cart?.discount || 0) + tax).toFixed(2)}</span>
                  </div>
                </div>

                <motion.button whileTap={{ scale: 0.97 }} onClick={() => navigate('/checkout')}
                  className="w-full btn-primary mt-5 flex items-center justify-center gap-2">
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
