import { API, BASE_URL } from '@/constants/api';
import axios, { AxiosError } from 'axios';

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

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 410) {
      try {
        await api({
          method: 'patch',
          url: API.REISSUE,
          withCredentials: true,
        });

        return api.request(error.config!);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
