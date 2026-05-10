import axios from 'axios';

/**
 * Creates a global Axios instance for API calls.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to handle global api errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error?.response?.data?.message || 'Network Error');
    return Promise.reject(error);
  }
);

export default api;
