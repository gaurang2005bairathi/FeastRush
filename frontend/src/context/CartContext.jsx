import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cartAPI } from '../api/axios';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], subtotal: 0, deliveryFee: 0, discount: 0, total: 0 });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const { data } = await cartAPI.get();
      setCart(data.data);
    } catch (err) {
      console.error('Failed to fetch cart', err);
    }
  }, [isAuthenticated]);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const addToCart = async (foodItemId, quantity = 1, customizations = []) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return false;
    }
    setLoading(true);
    try {
      const { data } = await cartAPI.add({ foodItemId, quantity, customizations });
      setCart(data.data);
      toast.success('Added to cart!');
      setIsOpen(true);
      return true;
    } catch (err) {
      const message = err.response?.data?.message;
      if (err.response?.data?.clearRequired) {
        toast.error(message, { duration: 5000 });
      } else {
        toast.error(message || 'Failed to add to cart');
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (itemId, quantity) => {
    try {
      const { data } = await cartAPI.update(itemId, { quantity });
      setCart(data.data);
    } catch (err) {
      toast.error('Failed to update cart');
    }
  };

  const removeItem = async (itemId) => {
    try {
      const { data } = await cartAPI.remove(itemId);
      setCart(data.data);
      toast.success('Item removed');
    } catch (err) {
      toast.error('Failed to remove item');
    }
  };

  const clearCart = async () => {
    try {
      await cartAPI.clear();
      setCart({ items: [], subtotal: 0, deliveryFee: 0, discount: 0, total: 0 });
    } catch (err) {
      toast.error('Failed to clear cart');
    }
  };

  const itemCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <CartContext.Provider value={{ cart, loading, isOpen, setIsOpen, addToCart, updateItem, removeItem, clearCart, fetchCart, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
