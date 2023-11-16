import api from '@/apis/axios';
import axios, { AxiosRequestConfig } from 'axios';

const getAPIResponseData = async <T>(option: AxiosRequestConfig<T>) => {
  try {
    const result = await api<T>(option);
    return result.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      process.env.NODE_ENV === 'development' && console.error(e.toJSON());
    }
  }
};

export default getAPIResponseData;
