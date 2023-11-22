import { API } from '@/constants/api';
import { Question } from '@/types/question';
import getAPIResponseData from '@/utils/getAPIResponseData';

export const getQuestion = async (id: number) => {
  return await getAPIResponseData<Question[]>({
    method: 'get',
    url: API.QUESTION,
    params: { category: id },
  });
};

export const postQuestion = async ({
  categoryId,
  content,
}: {
  categoryId: number;
  content: string;
}) => {
  return await getAPIResponseData({
    method: 'post',
    url: API.QUESTION,
    data: {
      categoryId: categoryId,
      content: content,
    },
  });
};
