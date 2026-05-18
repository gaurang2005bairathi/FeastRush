import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Package, CheckCircle, Truck, ChefHat, Clock, MapPin, CreditCard, XCircle } from 'lucide-react';
import { orderAPI } from '../api/axios';
import toast from 'react-hot-toast';

const steps = [
  { status: 'placed', label: 'Order Placed', icon: Package },
  { status: 'confirmed', label: 'Confirmed', icon: CheckCircle },
  { status: 'preparing', label: 'Preparing', icon: ChefHat },
  { status: 'out_for_delivery', label: 'On the Way', icon: Truck },
  { status: 'delivered', label: 'Delivered', icon: CheckCircle },
];

const statusOrder = ['placed', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'];

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    orderAPI.getById(id).then(({ data }) => setOrder(data.data)).catch(() => toast.error('Order not found')).finally(() => setLoading(false));
  }, [id]);

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    setCancelling(true);
    try {
      const { data } = await orderAPI.cancel(id, { reason: 'Cancelled by user' });
      setOrder(data.data);
      toast.success('Order cancelled');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Cannot cancel this order');
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
        <div className="max-w-2xl mx-auto px-4 animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
          <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!order) return null;

  const currentStepIndex = order.status === 'cancelled' ? -1 : statusOrder.indexOf(order.status);
  const isCancelled = order.status === 'cancelled';
  const canCancel = ['placed', 'confirmed'].includes(order.status);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate('/orders')} className="p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h1 className="font-display text-xl font-bold text-gray-900 dark:text-white">Order #{order.orderNumber}</h1>
            <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
          </div>
        </div>

        {/* Status tracker */}
        {!isCancelled ? (
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm mb-5">
            <h2 className="font-bold text-gray-900 dark:text-white mb-6">Order Status</h2>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
              <div className="space-y-6">
                {steps.map((step, i) => {
                  const isComplete = i <= currentStepIndex;
                  const isCurrent = i === currentStepIndex;
                  const StepIcon = step.icon;
                  return (
                    <div key={step.status} className="relative flex items-center gap-4">
                      <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${isComplete ? 'bg-primary-600 border-primary-600 text-white' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-400'}`}>
                        <StepIcon className="w-5 h-5" />
                        {isCurrent && <div className="absolute inset-0 rounded-full bg-primary-500 animate-ping opacity-20" />}
                      </div>
                      <div>
                        <p className={`font-semibold text-sm ${isComplete ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>{step.label}</p>
                        {isCurrent && <p className="text-xs text-primary-500 mt-0.5">Current status</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {order.estimatedDelivery && order.status !== 'delivered' && (
              <div className="mt-6 flex items-center gap-2 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                <Clock className="w-4 h-4 text-primary-500" />
                <p className="text-sm text-primary-700 dark:text-primary-300">
                  Est. delivery: {new Date(order.estimatedDelivery).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-5 mb-5 flex items-center gap-3">
            <XCircle className="w-6 h-6 text-red-500" />
            <div>
              <p className="font-semibold text-red-700 dark:text-red-400">Order Cancelled</p>
              <p className="text-sm text-red-600 dark:text-red-400">{order.cancellation?.reason}</p>
            </div>
          </div>
        )}

        {/* Delivery address */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm mb-5">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-primary-500" />
            <h3 className="font-bold text-gray-900 dark:text-white">Delivery Address</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {order.deliveryAddress?.label}: {order.deliveryAddress?.street}, {order.deliveryAddress?.city} {order.deliveryAddress?.zipCode}
          </p>
          {order.deliveryAddress?.instructions && <p className="text-gray-500 text-xs mt-1">Note: {order.deliveryAddress.instructions}</p>}
        </div>

        {/* Items */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm mb-5">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Order Items</h3>
          <div className="space-y-3">
            {order.items?.map(item => (
              <div key={item._id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-400">{item.quantity}x</span>
                  <p className="text-sm text-gray-900 dark:text-white">{item.name}</p>
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">${(item.totalPrice || 0).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm mb-5">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-4 h-4 text-primary-500" />
            <h3 className="font-bold text-gray-900 dark:text-white">Bill Summary</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Subtotal</span><span>${order.pricing?.subtotal?.toFixed(2)}</span></div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Delivery fee</span><span>{order.pricing?.deliveryFee === 0 ? 'Free' : `$${order.pricing?.deliveryFee?.toFixed(2)}`}</span></div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Tax</span><span>${order.pricing?.tax?.toFixed(2)}</span></div>
            {order.pricing?.discount > 0 && <div className="flex justify-between text-teal-600"><span>Discount</span><span>-${order.pricing?.discount?.toFixed(2)}</span></div>}
            <div className="flex justify-between font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-100 dark:border-gray-800 text-base">
              <span>Total</span><span>${order.pricing?.total?.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
            <span>Payment:</span>
            <span className="capitalize font-medium">{order.payment?.method}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${order.payment?.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {order.payment?.status}
            </span>
          </div>
        </div>

        {/* Cancel button */}
        {canCancel && (
          <motion.button whileTap={{ scale: 0.97 }} onClick={handleCancel} disabled={cancelling}
            className="w-full py-3 border-2 border-red-400 text-red-500 font-semibold rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50">
            {cancelling ? 'Cancelling...' : 'Cancel Order'}
          </motion.button>
        )}
      </div>
    </div>
  );
}
