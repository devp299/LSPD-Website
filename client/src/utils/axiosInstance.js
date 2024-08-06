// src/utils/axiosInstance.js
import axios from 'axios';
import {server} from '../constants/config.js';

const axiosInstance = axios.create({
  baseURL: `${server}/api/v1`,
  withCredentials: true
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('user-token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// export default axiosInstance;
