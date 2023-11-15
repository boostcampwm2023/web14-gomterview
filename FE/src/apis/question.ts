import { API } from '@/constants/api';
import getAPIResponseData from '@/utils/getAPIResponseData';

export const getQuestion = async (id: number) => {
  return await getAPIResponseData({
    method: 'get',
    url: API.QUESTION,
    params: { category: id },
  });
};
