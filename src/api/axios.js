import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://your-api-url.com/api', // update!
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Token Interceptor if needed
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
