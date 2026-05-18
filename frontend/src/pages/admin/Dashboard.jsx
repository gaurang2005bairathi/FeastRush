import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Store, ShoppingBag, DollarSign, TrendingUp, Package, ChefHat, Truck } from 'lucide-react';
import { orderAPI, userAPI, restaurantAPI } from '../../api/axios';
import AdminLayout from '../../components/admin/AdminLayout';

const StatCard = ({ icon: Icon, title, value, subtitle, color, delay }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
    className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <TrendingUp className="w-4 h-4 text-teal-500" />
    </div>
    <div className="text-2xl font-black font-display text-gray-900 dark:text-white">{value}</div>
    <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-1">{title}</div>
    {subtitle && <div className="text-xs text-gray-400 mt-0.5">{subtitle}</div>}
  </motion.div>
);

const statusConfig = {
  placed: 'bg-blue-100 text-blue-700',
  confirmed: 'bg-purple-100 text-purple-700',
  preparing: 'bg-yellow-100 text-yellow-700',
  out_for_delivery: 'bg-teal-100 text-teal-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([orderAPI.getAnalytics(), userAPI.getStats()])
      .then(([aRes, uRes]) => { setAnalytics(aRes.data.data); setUserStats(uRes.data.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const stats = analytics && userStats ? [
    { icon: DollarSign, title: 'Total Revenue', value: `$${analytics.totalRevenue?.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, color: 'bg-primary-600', delay: 0 },
    { icon: ShoppingBag, title: 'Total Orders', value: analytics.totalOrders?.toLocaleString(), color: 'bg-teal-600', delay: 0.1 },
    { icon: Users, title: 'Total Users', value: userStats.totalUsers?.toLocaleString(), subtitle: `${userStats.newToday} new today`, color: 'bg-pink-500', delay: 0.2 },
    { icon: Package, title: 'Delivered', value: analytics.statusCounts?.delivered || 0, color: 'bg-green-600', delay: 0.3 },
  ] : [];

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome to FeastRush Admin</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl p-5 animate-pulse h-36" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map(s => <StatCard key={s.title} {...s} />)}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Status breakdown */}
        {analytics?.statusCounts && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
            <h2 className="font-bold text-gray-900 dark:text-white mb-4">Orders by Status</h2>
            <div className="space-y-3">
              {Object.entries(analytics.statusCounts).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize ${statusConfig[status] || 'bg-gray-100 text-gray-700'}`}>
                      {status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-primary-500 rounded-full" style={{ width: `${Math.min((count / analytics.totalOrders) * 100, 100)}%` }} />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent orders */}
        {analytics?.recentOrders && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 dark:text-white">Recent Orders</h2>
              <Link to="/admin/orders" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">View all</Link>
            </div>
            <div className="space-y-3">
              {analytics.recentOrders.map(order => (
                <div key={order._id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{order.user?.name}</p>
                    <p className="text-xs text-gray-500">{order.restaurant?.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">${order.pricing?.total?.toFixed(2)}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusConfig[order.status] || 'bg-gray-100 text-gray-600'}`}>
                      {order.status?.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {[
          { label: 'Manage Restaurants', href: '/admin/restaurants', icon: Store, color: 'from-primary-600 to-primary-700' },
          { label: 'Manage Foods', href: '/admin/foods', icon: ChefHat, color: 'from-teal-600 to-teal-700' },
          { label: 'Manage Orders', href: '/admin/orders', icon: Truck, color: 'from-yellow-500 to-yellow-600' },
          { label: 'Manage Users', href: '/admin/users', icon: Users, color: 'from-pink-500 to-pink-600' },
        ].map((item, i) => (
          <motion.div key={item.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}>
            <Link to={item.href} className={`block p-5 rounded-2xl bg-gradient-to-br ${item.color} text-white hover:opacity-90 transition-opacity`}>
              <item.icon className="w-7 h-7 mb-3" />
              <p className="font-semibold text-sm">{item.label}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </AdminLayout>
  );
}
