import { AnswerItemResDto } from '@/types/answer';
import { API } from '@/constants/api';
import getAPIResponseData from '@/utils/getAPIResponseData';

export const getQuestionAnswer = async (questionId: number) => {
  return await getAPIResponseData<AnswerItemResDto[]>({
    method: 'get',
    url: API.ANSWER_ID(questionId),
  });
};

export const postAnswer = async ({
  questionId,
  content,
}: {
  questionId: number;
  content: string;
}) => {
  return await getAPIResponseData({
    method: 'post',
    url: API.ANSWER,
    data: { questionId, content },
  });
};

export const postDefaultAnswer = async ({
  questionId,
  answerId,
}: {
  questionId: number;
  answerId: number;
}) => {
  return await getAPIResponseData({
    method: 'post',
    url: API.ANSWER_DEFAULT,
    data: { questionId, answerId },
  });
};
