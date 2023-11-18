import { BASE_URL } from '@/constants/api';
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

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    // TODO: console은 dev 환경에서만 동작해야 하고 실제 prod환경에서는 어떻게 처리할지 논의 해봐야함
    (error: AxiosError) => {
      if (error.code === 'ECONNABORTED') {
        alert('서버에 이상이 있습니다.');
      }
      switch (error.response?.status) {
        case 401:
          console.warn('401: 인증정보 없음');
          break;
        case 403:
          console.warn('403: 권한 없음');
          break;
        case 404:
          console.warn('404: 대상을 찾지 못함');
          break;
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
          console.warn(`${error.response?.status}: 서버 오류`);
          break;
        default:
          console.error(`${error.response?.status}: unhandled error!`);
          break;
      }
      return Promise.reject(error);
    }
  );
  return axiosInstance;
})();

export default api;
