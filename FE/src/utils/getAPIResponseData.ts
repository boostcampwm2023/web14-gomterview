import api from '@/apis/axios';
import axios, { AxiosRequestConfig } from 'axios';

const getAPIResponseData = async <T, D = T>(option: AxiosRequestConfig<D>) => {
  try {
    const result = await api<T>(option);
    return result.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      process.env.NODE_ENV === 'development' && console.error(e.toJSON());
    }
    throw e;
  }
};

export default getAPIResponseData;
