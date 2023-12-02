import { API } from '@/constants/api';
import { CategoryListResDto } from '@/types/category';
import getAPIResponseData from '@/utils/getAPIResponseData';

export const getCategory = async () => {
  return await getAPIResponseData<CategoryListResDto>({
    method: 'get',
    url: API.CATEGORY,
  });
};
