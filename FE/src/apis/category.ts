import { API } from '@/constants/api';
import getAPIResponseData from '@/utils/getAPIResponseData';

export const getCategory = async () => {
  return await getAPIResponseData({
    method: 'get',
    url: API.CATEGORY,
  });
};
