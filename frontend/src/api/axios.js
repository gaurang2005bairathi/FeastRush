import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('feastrush_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('feastrush_token');
      localStorage.removeItem('feastrush_user');
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getMe: () => API.get('/auth/me'),
  updateProfile: (data) => API.put('/auth/profile', data),
  changePassword: (data) => API.put('/auth/change-password', data),
  addAddress: (data) => API.post('/auth/address', data),
  toggleFavorite: (id) => API.post(`/auth/favorites/${id}`),
};

export const restaurantAPI = {
  getAll: (params) => API.get('/restaurants', { params }),
  getById: (id) => API.get(`/restaurants/${id}`),
  getMenu: (id, params) => API.get(`/restaurants/${id}/menu`, { params }),
  getFeatured: () => API.get('/restaurants/featured'),
  search: (q) => API.get('/restaurants/search', { params: { q } }),
  create: (data) => API.post('/restaurants', data),
  update: (id, data) => API.put(`/restaurants/${id}`, data),
  delete: (id) => API.delete(`/restaurants/${id}`),
};

export const foodAPI = {
  getAll: (params) => API.get('/foods', { params }),
  getById: (id) => API.get(`/foods/${id}`),
  getPopular: () => API.get('/foods/popular'),
  search: (q) => API.get('/foods/search', { params: { q } }),
  create: (data) => API.post('/foods', data),
  update: (id, data) => API.put(`/foods/${id}`, data),
  delete: (id) => API.delete(`/foods/${id}`),
};

export const cartAPI = {
  get: () => API.get('/cart'),
  add: (data) => API.post('/cart/add', data),
  update: (itemId, data) => API.put(`/cart/item/${itemId}`, data),
  remove: (itemId) => API.delete(`/cart/item/${itemId}`),
  clear: () => API.delete('/cart/clear'),
};

export const orderAPI = {
  create: (data) => API.post('/orders', data),
  getMyOrders: (params) => API.get('/orders/my-orders', { params }),
  getById: (id) => API.get(`/orders/${id}`),
  cancel: (id, data) => API.put(`/orders/${id}/cancel`, data),
  getAll: (params) => API.get('/orders', { params }),
  updateStatus: (id, data) => API.put(`/orders/${id}/status`, data),
  getAnalytics: () => API.get('/orders/admin/analytics'),
};

export const categoryAPI = {
  getAll: () => API.get('/categories'),
  create: (data) => API.post('/categories', data),
  update: (id, data) => API.put(`/categories/${id}`, data),
  delete: (id) => API.delete(`/categories/${id}`),
};

export const userAPI = {
  getAll: (params) => API.get('/users', { params }),
  getById: (id) => API.get(`/users/${id}`),
  updateRole: (id, data) => API.put(`/users/${id}/role`, data),
  toggleStatus: (id) => API.put(`/users/${id}/toggle-status`),
  getStats: () => API.get('/users/stats'),
};

export const reviewAPI = {
  getByRestaurant: (id) => API.get(`/reviews/restaurant/${id}`),
  create: (data) => API.post('/reviews', data),
};
