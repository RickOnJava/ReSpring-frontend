import { server } from '@/config';
import axios from 'axios';

const api = axios.create({
  baseURL: `${server}/api/v1`, // Change this to your backend URL
});

// Automatically attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
