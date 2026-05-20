import axios from 'axios';
import { storage } from './storage';

const api = axios.create({
  baseURL: 'https://nexus-server-gewa.onrender.com',
});

api.interceptors.request.use(
  async (config) => {
    const token = await storage.getToken();

    if (token && token !== 'undefined' && token !== 'null' && !config.url?.includes('/auth/')) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;