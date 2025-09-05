import axios from "axios";

export const API_URL = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const WS_URL = import.meta.env.VITE_WS_URL;    
