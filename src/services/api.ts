
import { IWine, IWinery, IOrder, IUser } from '../api/types';

// Base URL for API calls
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Helper function for API requests
async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem('token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options?.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'An error occurred with the API request');
  }

  return response.json();
}

// Wine API calls
export const wineApi = {
  getAll: () => request<IWine[]>('/wines'),
  getById: (id: string) => request<IWine>(`/wines/${id}`),
  getByWinery: (wineryId: string) => request<IWine[]>(`/wines?wineryId=${wineryId}`),
  search: (query: string) => request<IWine[]>(`/wines/search?q=${query}`),
  filter: (filters: Record<string, any>) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });
    return request<IWine[]>(`/wines/filter?${params.toString()}`);
  },
};

// Winery API calls
export const wineryApi = {
  getAll: () => request<IWinery[]>('/wineries'),
  getById: (id: string) => request<IWinery>(`/wineries/${id}`),
  getFeatured: () => request<IWinery[]>('/wineries/featured'),
};

// Order API calls
export const orderApi = {
  create: (orderData: Omit<IOrder, 'id' | 'createdAt' | 'updatedAt'>) => 
    request<IOrder>('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),
  getByUser: () => request<IOrder[]>('/orders/user'),
  getById: (id: string) => request<IOrder>(`/orders/${id}`),
  updateStatus: (id: string, status: IOrder['status']) => 
    request<IOrder>(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};

// Auth API calls
export const authApi = {
  login: (email: string, password: string) => 
    request<{ token: string; user: Omit<IUser, 'password'> }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  register: (userData: Omit<IUser, 'id' | 'createdAt'>) => 
    request<{ token: string; user: Omit<IUser, 'password'> }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  getCurrentUser: () => request<Omit<IUser, 'password'>>('/auth/me'),
};

// QR Code API
export const qrCodeApi = {
  generateForWine: (wineId: string) => 
    request<{ qrCodeUrl: string }>(`/qrcodes/wine/${wineId}`, { method: 'POST' }),
};

// Payment API
export const paymentApi = {
  createCheckoutSession: (orderId: string) => 
    request<{ sessionUrl: string }>('/payments/create-checkout-session', {
      method: 'POST',
      body: JSON.stringify({ orderId }),
    }),
  verifyPayment: (paymentId: string, orderId: string) => 
    request<{ success: boolean }>('/payments/verify', {
      method: 'POST',
      body: JSON.stringify({ paymentId, orderId }),
    }),
};
