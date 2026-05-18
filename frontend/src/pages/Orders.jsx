import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle, XCircle, Truck, ChefHat, ArrowRight } from 'lucide-react';
import { orderAPI } from '../api/axios';

const statusConfig = {
  placed: { label: 'Order Placed', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: Package },
  confirmed: { label: 'Confirmed', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', icon: CheckCircle },
  preparing: { label: 'Preparing', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', icon: ChefHat },
  out_for_delivery: { label: 'On the Way', color: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400', icon: Truck },
  delivered: { label: 'Delivered', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', icon: XCircle },
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    orderAPI.getMyOrders()
      .then(({ data }) => setOrders(data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeFilter === 'all' ? orders : orders.filter(o => o.status === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="section-title mb-2">My Orders</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">{orders.length} orders total</p>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['all', 'placed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'].map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${activeFilter === f ? 'bg-primary-600 text-white' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-primary-300'}`}>
              {f === 'all' ? 'All Orders' : f.replace(/_/g, ' ')}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl p-5 animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-3" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No orders yet</h3>
            <p className="text-gray-500 mb-6">Start ordering from your favorite restaurants</p>
            <Link to="/restaurants" className="btn-primary">Browse Restaurants</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((order, i) => {
              const status = statusConfig[order.status] || statusConfig.placed;
              const StatusIcon = status.icon;
              return (
                <motion.div key={order._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link to={`/orders/${order._id}`} className="block">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-4">
                          <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                            <img src={order.restaurant?.image} alt={order.restaurant?.name}
                              className="w-full h-full object-cover"
                              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100'; }} />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">{order.restaurant?.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                              {order.items?.length} item{order.items?.length !== 1 ? 's' : ''} · ${order.pricing?.total?.toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">#{order.orderNumber} · {new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${status.color}`}>
                            <StatusIcon className="w-3.5 h-3.5" />
                            {status.label}
                          </span>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
