import { logout } from '@/entities';
import axios from 'axios';
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url.includes('/auth/refresh-token')) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axiosInstance.post('/auth/refresh-token');
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Refresh 실패');
        await logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
