import { API } from '@/constants/api';
import { CategoryResDto } from '@/types/category';
import getAPIResponseData from '@/utils/getAPIResponseData';

export const getCategory = async () => {
  return await getAPIResponseData<CategoryResDto>({
    method: 'get',
    url: API.CATEGORY,
  });
};
