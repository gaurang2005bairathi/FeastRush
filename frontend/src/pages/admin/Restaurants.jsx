import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Star, X } from 'lucide-react';
import { restaurantAPI } from '../../api/axios';
import AdminLayout from '../../components/admin/AdminLayout';
import toast from 'react-hot-toast';

const initialForm = { name: '', description: '', image: '', cuisine: '', 'address.street': '', 'address.city': '', 'address.state': '', 'deliveryInfo.time': '30-40 min', 'deliveryInfo.fee': 0, isFeatured: false, isPremium: false };

export default function AdminRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    restaurantAPI.getAll({ limit: 50 })
      .then(({ data }) => setRestaurants(data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const openCreate = () => { setEditing(null); setForm(initialForm); setShowModal(true); };
  const openEdit = (r) => {
    setEditing(r._id);
    setForm({
      name: r.name, description: r.description || '', image: r.image,
      cuisine: r.cuisine?.join(', ') || '',
      'address.street': r.address?.street || '', 'address.city': r.address?.city || '',
      'address.state': r.address?.state || '',
      'deliveryInfo.time': r.deliveryInfo?.time || '30-40 min',
      'deliveryInfo.fee': r.deliveryInfo?.fee || 0,
      isFeatured: r.isFeatured, isPremium: r.isPremium
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        name: form.name, description: form.description, image: form.image,
        cuisine: form.cuisine.split(',').map(s => s.trim()).filter(Boolean),
        address: { street: form['address.street'], city: form['address.city'], state: form['address.state'] },
        deliveryInfo: { time: form['deliveryInfo.time'], fee: Number(form['deliveryInfo.fee']) },
        isFeatured: form.isFeatured, isPremium: form.isPremium
      };

      if (editing) {
        const { data } = await restaurantAPI.update(editing, payload);
        setRestaurants(prev => prev.map(r => r._id === editing ? data.data : r));
        toast.success('Restaurant updated');
      } else {
        const { data } = await restaurantAPI.create(payload);
        setRestaurants(prev => [data.data, ...prev]);
        toast.success('Restaurant created');
      }
      setShowModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await restaurantAPI.delete(id);
      setRestaurants(prev => prev.filter(r => r._id !== id));
      toast.success('Restaurant deleted');
    } catch { toast.error('Failed to delete'); }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">Restaurants</h1>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2 text-sm py-2 px-4">
          <Plus className="w-4 h-4" /> Add Restaurant
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-64 bg-white dark:bg-gray-900 rounded-2xl animate-pulse" />)
        ) : restaurants.map((r, i) => (
          <motion.div key={r._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="relative h-36">
              <img src={r.image} alt={r.name} className="w-full h-full object-cover"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400'; }} />
              <div className="absolute top-2 right-2 flex gap-1">
                {r.isFeatured && <span className="px-2 py-0.5 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-lg">Featured</span>}
                {!r.isActive && <span className="px-2 py-0.5 bg-gray-800/80 text-white text-xs font-bold rounded-lg">Deleted</span>}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 dark:text-white truncate">{r.name}</h3>
              <p className="text-sm text-gray-500 truncate">{r.cuisine?.join(', ')}</p>
              <div className="flex items-center gap-2 mt-2">
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{r.rating?.average?.toFixed(1)} ({r.rating?.count})</span>
              </div>
              <div className="flex gap-2 mt-3">
                <button onClick={() => openEdit(r)} className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
                  <Edit className="w-3.5 h-3.5" /> Edit
                </button>
                <button onClick={() => handleDelete(r._id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm text-red-500 border border-red-200 dark:border-red-800 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)} className="fixed inset-0 bg-black/60 z-50" />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <h2 className="font-bold text-gray-900 dark:text-white">{editing ? 'Edit Restaurant' : 'Add Restaurant'}</h2>
                <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-gray-400" /></button>
              </div>
              <form onSubmit={handleSave} className="p-5 space-y-4">
                {[
                  { name: 'name', label: 'Name *', placeholder: 'Restaurant name' },
                  { name: 'description', label: 'Description', placeholder: 'Short description' },
                  { name: 'image', label: 'Image URL *', placeholder: 'https://...' },
                  { name: 'cuisine', label: 'Cuisine (comma separated)', placeholder: 'Italian, Pizza' },
                  { name: 'address.street', label: 'Street', placeholder: '123 Main St' },
                  { name: 'address.city', label: 'City', placeholder: 'New York' },
                  { name: 'address.state', label: 'State', placeholder: 'NY' },
                  { name: 'deliveryInfo.time', label: 'Delivery Time', placeholder: '30-40 min' },
                  { name: 'deliveryInfo.fee', label: 'Delivery Fee ($)', type: 'number' },
                ].map(({ name, label, placeholder, type = 'text' }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
                    <input name={name} type={type} value={form[name]} onChange={handleChange} placeholder={placeholder} className="input text-sm" />
                  </div>
                ))}
                <div className="flex gap-4">
                  {[{ name: 'isFeatured', label: 'Featured' }, { name: 'isPremium', label: 'Premium' }].map(({ name, label }) => (
                    <label key={name} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" name={name} checked={form[name]} onChange={handleChange} className="w-4 h-4 rounded accent-primary-600" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
                    </label>
                  ))}
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 btn-outline py-2.5 text-sm">Cancel</button>
                  <button type="submit" disabled={saving} className="flex-1 btn-primary py-2.5 text-sm disabled:opacity-60">
                    {saving ? 'Saving...' : editing ? 'Save Changes' : 'Create Restaurant'}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
