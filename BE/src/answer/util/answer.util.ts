import { isEmpty } from 'class-validator';
import { AnswerNotFoundException } from '../exception/answer.exception';
import { Answer } from '../entity/answer';

export const validateAnswer = (answer: Answer) => {
  if (isEmpty(answer)) {
    throw new AnswerNotFoundException();
  }
};
