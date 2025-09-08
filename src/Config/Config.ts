import axios from "axios";

export const API_URL = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
API_URL.interceptors.request.use((config) => {
  // Get token from localStorage (Zustand persist stores it there)
  const authStorage = localStorage.getItem('auth-storage');
  if (authStorage) {
    try {
      const parsedAuth = JSON.parse(authStorage);
      const token = parsedAuth.state?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn('Failed to parse auth storage:', error);
    }
  }
  return config;
});

export const WS_URL = import.meta.env.VITE_WS_URL;    
