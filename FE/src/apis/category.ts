import { API } from '@/constants/api';
import { Category } from '@/types/category';
import getAPIResponseData from '@/utils/getAPIResponseData';

export const getCategory = async () => {
  return await getAPIResponseData<Category[]>({
    method: 'get',
    url: API.CATEGORY,
  });
};
