import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, X, Star, Leaf } from 'lucide-react';
import { foodAPI, restaurantAPI } from '../../api/axios';
import AdminLayout from '../../components/admin/AdminLayout';
import toast from 'react-hot-toast';

const initialForm = { name: '', description: '', price: '', discountedPrice: '', image: '', restaurant: '', isVeg: false, isBestseller: false, isFeatured: false, isAvailable: true, spiceLevel: 'mild' };

export default function AdminFoods() {
  const [foods, setFoods] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([
      foodAPI.getAll({ limit: 50 }).then(({ data }) => setFoods(data.data || [])),
      restaurantAPI.getAll({ limit: 100 }).then(({ data }) => setRestaurants(data.data || []))
    ]).finally(() => setLoading(false));
  }, []);

  const openCreate = () => { setEditing(null); setForm(initialForm); setShowModal(true); };
  const openEdit = (f) => {
    setEditing(f._id);
    setForm({ name: f.name, description: f.description || '', price: f.price, discountedPrice: f.discountedPrice || '', image: f.image, restaurant: f.restaurant?._id || f.restaurant, isVeg: f.isVeg, isBestseller: f.isBestseller, isFeatured: f.isFeatured, isAvailable: f.isAvailable, spiceLevel: f.spiceLevel });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, price: Number(form.price), discountedPrice: form.discountedPrice ? Number(form.discountedPrice) : null };
      if (editing) {
        const { data } = await foodAPI.update(editing, payload);
        setFoods(prev => prev.map(f => f._id === editing ? data.data : f));
        toast.success('Food item updated');
      } else {
        const { data } = await foodAPI.create(payload);
        setFoods(prev => [data.data, ...prev]);
        toast.success('Food item created');
      }
      setShowModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this food item?')) return;
    try {
      await foodAPI.delete(id);
      setFoods(prev => prev.filter(f => f._id !== id));
      toast.success('Deleted');
    } catch { toast.error('Failed to delete'); }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">Food Items</h1>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2 text-sm py-2 px-4">
          <Plus className="w-4 h-4" /> Add Food Item
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                {['Food', 'Restaurant', 'Price', 'Status', 'Rating', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i} className="border-b border-gray-50 dark:border-gray-800">
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} className="px-5 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" /></td>
                    ))}
                  </tr>
                ))
              ) : foods.map((food, i) => (
                <motion.tr key={food._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
                  className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={food.image} alt={food.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100'; }} />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{food.name}</span>
                          {food.isVeg && <Leaf className="w-3.5 h-3.5 text-green-500" />}
                          {food.isBestseller && <span className="text-xs">🔥</span>}
                        </div>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${food.spiceLevel === 'hot' ? 'bg-red-100 text-red-600' : food.spiceLevel === 'medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'}`}>
                          {food.spiceLevel}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-400">{food.restaurant?.name || '-'}</td>
                  <td className="px-5 py-4">
                    <div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">${food.price}</span>
                      {food.discountedPrice && <span className="text-xs text-gray-400 line-through ml-1">${food.price}</span>}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${food.isAvailable ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {food.isAvailable ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-0.5 text-yellow-500 text-sm">
                      <Star className="w-3.5 h-3.5 fill-current" />{food.rating?.average?.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(food)} className="p-1.5 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(food._id)} className="p-1.5 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {!loading && foods.length === 0 && <div className="text-center py-12 text-gray-500">No food items found</div>}
        </div>
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
                <h2 className="font-bold text-gray-900 dark:text-white">{editing ? 'Edit Food Item' : 'Add Food Item'}</h2>
                <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-gray-400" /></button>
              </div>
              <form onSubmit={handleSave} className="p-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Restaurant *</label>
                  <select name="restaurant" value={form.restaurant} onChange={handleChange} className="input text-sm">
                    <option value="">Select Restaurant</option>
                    {restaurants.map(r => <option key={r._id} value={r._id}>{r.name}</option>)}
                  </select>
                </div>
                {[
                  { name: 'name', label: 'Name *', placeholder: 'Food item name' },
                  { name: 'description', label: 'Description', placeholder: 'Brief description' },
                  { name: 'image', label: 'Image URL *', placeholder: 'https://...' },
                  { name: 'price', label: 'Price ($) *', type: 'number' },
                  { name: 'discountedPrice', label: 'Discounted Price ($)', type: 'number' },
                ].map(({ name, label, placeholder, type = 'text' }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
                    <input name={name} type={type} value={form[name]} onChange={handleChange} placeholder={placeholder} className="input text-sm" step="0.01" />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Spice Level</label>
                  <select name="spiceLevel" value={form.spiceLevel} onChange={handleChange} className="input text-sm">
                    {['mild', 'medium', 'hot', 'extra-hot'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="flex flex-wrap gap-4">
                  {[{ name: 'isVeg', label: 'Vegetarian' }, { name: 'isBestseller', label: 'Bestseller' }, { name: 'isFeatured', label: 'Featured' }, { name: 'isAvailable', label: 'Available' }].map(({ name, label }) => (
                    <label key={name} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" name={name} checked={form[name]} onChange={handleChange} className="w-4 h-4 rounded accent-primary-600" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
                    </label>
                  ))}
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 btn-outline py-2.5 text-sm">Cancel</button>
                  <button type="submit" disabled={saving} className="flex-1 btn-primary py-2.5 text-sm disabled:opacity-60">
                    {saving ? 'Saving...' : editing ? 'Save Changes' : 'Create Item'}
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
