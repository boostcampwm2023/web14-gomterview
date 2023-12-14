import { API, BASE_URL } from '@/constants/api';
import { PATH } from '@constants/path';
import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,

  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

let error410Count = 0; // 410 에러 카운터

api.interceptors.response.use(
  (response) => {
    error410Count = 0;
    return response;
  },
  async (error: AxiosError<{ message: string; errorCode: string }>) => {
    if (error.response?.status === 410) {
      error410Count++;
      if (error410Count >= 10) {
        // EDGE: 비정상적인 410 반환 시 10번 이상 재시도 시 그냥
        return Promise.reject(error);
      }
      await api({
        method: 'patch',
        url: API.REISSUE(),
      });
    } else if (error.response?.status === 401) {
      if (error.response?.data.errorCode === 'T03') {
        alert('다시 로그인 해 주세요.');
        window.location.href = PATH.ROOT;
        return Promise.reject(error);
      } else {
        return;
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;
