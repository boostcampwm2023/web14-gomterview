import { Question } from '../entity/question';
import { isEmpty } from 'class-validator';
import { QuestionNotFoundException } from '../exception/question.exception';

export const validateQuestion = (question: Question) => {
  if (isEmpty(question)) {
    throw new QuestionNotFoundException();
  }
};
