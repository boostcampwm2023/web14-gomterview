import { BASE_URL } from '@/constants/api';
import axios from 'axios';

const api = (() => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 3000,

    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  return axiosInstance;
})();

export default api;
