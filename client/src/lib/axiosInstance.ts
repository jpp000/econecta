import { env } from '@/constants/env';
import { useAuthStore } from '@/store/useAuthStore';
import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: env.apiUrl,
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
      const { token } = useAuthStore.getState();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  