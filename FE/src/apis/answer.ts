import { Answer } from '@/types/answer';
import api from './axios';
import { API } from '@/constants/api';

export const getQuestionAnswer = async (questionId: number) => {
  const response = await api.get<Answer[]>(API.ANSWER_ID(questionId));

  return response.data;
};

export const postAnswer = async (questionId: number, content: string) => {
  const response = await api.post<void>(API.ANSWER, {
    questionId,
    content,
  });

  return response.data;
};
