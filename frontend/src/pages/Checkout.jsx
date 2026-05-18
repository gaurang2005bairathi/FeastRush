import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, CreditCard, Truck, Check, ArrowRight, ChevronLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../api/axios';
import toast from 'react-hot-toast';

const paymentMethods = [
  { id: 'cash', label: 'Cash on Delivery', icon: '💵' },
  { id: 'card', label: 'Credit/Debit Card', icon: '💳' },
  { id: 'upi', label: 'UPI Payment', icon: '📱' },
];

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState('cash');
  const [address, setAddress] = useState({
    label: 'Home',
    street: user?.addresses?.[0]?.street || '',
    city: user?.addresses?.[0]?.city || '',
    state: user?.addresses?.[0]?.state || '',
    zipCode: user?.addresses?.[0]?.zipCode || '',
    instructions: ''
  });

  const tax = Math.round((cart?.subtotal || 0) * 0.05 * 100) / 100;
  const total = (cart?.subtotal || 0) + (cart?.deliveryFee || 0) - (cart?.discount || 0) + tax;

  const handlePlaceOrder = async () => {
    if (!address.street || !address.city) { toast.error('Please fill in delivery address'); return; }
    if (!cart?.items?.length) { toast.error('Your cart is empty'); return; }

    setLoading(true);
    try {
      const { data } = await orderAPI.create({
        deliveryAddress: address,
        paymentMethod: payment,
      });
      toast.success('Order placed successfully!');
      navigate(`/orders/${data.data._id}`, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (!cart?.items?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your cart is empty</h2>
          <button onClick={() => navigate('/restaurants')} className="btn-primary">Browse Restaurants</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">Checkout</h1>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-8">
          {[{ n: 1, label: 'Address' }, { n: 2, label: 'Payment' }, { n: 3, label: 'Review' }].map(({ n, label }, i) => (
            <React.Fragment key={n}>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${step >= n ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-500'}`}>
                {step > n ? <Check className="w-4 h-4" /> : <span>{n}</span>}
                <span className="hidden sm:inline">{label}</span>
              </div>
              {i < 2 && <div className={`flex-1 h-px ${step > n + 1 ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'}`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main form */}
          <div className="lg:col-span-2 space-y-5">
            {/* Step 1: Address */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-primary-600" />
                    </div>
                    <h2 className="font-bold text-gray-900 dark:text-white">Delivery Address</h2>
                  </div>

                  {user?.addresses?.length > 0 && (
                    <div className="mb-5">
                      <p className="text-sm font-medium text-gray-500 mb-3">Saved Addresses</p>
                      <div className="grid gap-2">
                        {user.addresses.map((addr, i) => (
                          <button key={i}
                            onClick={() => setAddress({ ...addr, instructions: '' })}
                            className={`text-left p-3 rounded-xl border-2 transition-all ${addr.street === address.street ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}>
                            <p className="font-medium text-sm text-gray-900 dark:text-white">{addr.label}</p>
                            <p className="text-xs text-gray-500">{addr.street}, {addr.city}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Street Address *</label>
                      <input value={address.street} onChange={(e) => setAddress(p => ({ ...p, street: e.target.value }))}
                        placeholder="123 Main Street" className="input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">City *</label>
                      <input value={address.city} onChange={(e) => setAddress(p => ({ ...p, city: e.target.value }))}
                        placeholder="New York" className="input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">State</label>
                      <input value={address.state} onChange={(e) => setAddress(p => ({ ...p, state: e.target.value }))}
                        placeholder="NY" className="input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">ZIP Code</label>
                      <input value={address.zipCode} onChange={(e) => setAddress(p => ({ ...p, zipCode: e.target.value }))}
                        placeholder="10001" className="input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Label</label>
                      <select value={address.label} onChange={(e) => setAddress(p => ({ ...p, label: e.target.value }))} className="input">
                        {['Home', 'Work', 'Other'].map(l => <option key={l}>{l}</option>)}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Delivery Instructions (optional)</label>
                      <textarea value={address.instructions} onChange={(e) => setAddress(p => ({ ...p, instructions: e.target.value }))}
                        placeholder="E.g., Ring the bell, leave at door..." rows={2} className="input resize-none" />
                    </div>
                  </div>

                  <button onClick={() => setStep(2)} className="btn-primary mt-5 w-full flex items-center justify-center gap-2">
                    Continue to Payment <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-teal-600" />
                    </div>
                    <h2 className="font-bold text-gray-900 dark:text-white">Payment Method</h2>
                  </div>

                  <div className="space-y-3">
                    {paymentMethods.map(m => (
                      <button key={m.id} onClick={() => setPayment(m.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${payment === m.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}>
                        <span className="text-2xl">{m.icon}</span>
                        <span className="font-medium text-gray-900 dark:text-white">{m.label}</span>
                        {payment === m.id && <Check className="w-5 h-5 text-primary-600 ml-auto" />}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-5">
                    <button onClick={() => setStep(1)} className="flex-1 btn-outline">Back</button>
                    <button onClick={() => setStep(3)} className="flex-1 btn-primary flex items-center justify-center gap-2">
                      Review Order <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                  <h2 className="font-bold text-gray-900 dark:text-white mb-5">Review Your Order</h2>

                  {/* Address summary */}
                  <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl mb-4">
                    <MapPin className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{address.label}</p>
                      <p className="text-sm text-gray-500">{address.street}, {address.city} {address.zipCode}</p>
                    </div>
                  </div>

                  {/* Payment summary */}
                  <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl mb-5">
                    <span className="text-xl">{paymentMethods.find(m => m.id === payment)?.icon}</span>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{paymentMethods.find(m => m.id === payment)?.label}</p>
                  </div>

                  {/* Order items */}
                  <div className="space-y-3 mb-5">
                    {cart.items?.map(item => (
                      <div key={item._id} className="flex items-center gap-3">
                        <img src={item.foodItem?.image} alt={item.foodItem?.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{item.foodItem?.name}</p>
                          <p className="text-xs text-gray-500">x{item.quantity}</p>
                        </div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">${(item.totalPrice || 0).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="flex-1 btn-outline">Back</button>
                    <motion.button whileTap={{ scale: 0.98 }} onClick={handlePlaceOrder} disabled={loading}
                      className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-60">
                      {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        : <><Truck className="w-4 h-4" /> Place Order</>}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                {cart.items?.map(item => (
                  <div key={item._id} className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400 truncate flex-1 mr-2">{item.foodItem?.name} x{item.quantity}</span>
                    <span className="text-gray-900 dark:text-white font-medium">${(item.totalPrice || 0).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 dark:border-gray-800 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span><span>${(cart?.subtotal || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Delivery</span><span>{(cart?.deliveryFee || 0) === 0 ? 'Free' : `$${cart.deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Tax (5%)</span><span>${tax.toFixed(2)}</span>
                </div>
                {cart?.discount > 0 && (
                  <div className="flex justify-between text-sm text-teal-600">
                    <span>Discount</span><span>-${cart.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-100 dark:border-gray-800">
                  <span>Total</span><span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
