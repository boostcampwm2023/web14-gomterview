import { API, BASE_URL } from '@/constants/api';
import { QUERY_KEY } from '@constants/queryKey';
import { useQueryClient } from '@tanstack/react-query';
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

let error410Count = 0; // 410 에러 카운터

api.interceptors.response.use(
  (response) => {
    error410Count = 0;
    return response;
  },
  async (error: AxiosError) => {
    const queryClient = useQueryClient();
    if (error.response?.status === 410) {
      try {
        error410Count++;
        if (error410Count >= 10) {
          // EDGE: 비정상적인 410 반환 시 10번 이상 재시도 시 그냥
          return Promise.reject(error);
        }
        await api({
          method: 'patch',
          url: API.REISSUE,
        });

        return api.request(error.config!);
      } catch (err) {
        queryClient.setQueryData(QUERY_KEY.MEMBER, null);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
