// src/lib/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // or use import.meta.env.VITE_API_URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;