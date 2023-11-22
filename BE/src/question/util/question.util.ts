import { Question } from '../entity/question';
import { categoryFixtureWithId } from '../../category/fixture/category.fixture';
import { CreateQuestionRequest } from '../dto/createQuestionRequest';
import { isEmpty } from 'class-validator';
import { QuestionNotFoundException } from '../exception/question.exception';

export const questionFixture = new Question(
  1,
  'tester',
  categoryFixtureWithId,
  null,
  new Date(),
  null,
);

export const createQuestionRequestFixture = new CreateQuestionRequest(
  categoryFixtureWithId.id,
  'tester',
);

export const validateQuestion = (question: Question) => {
  if (isEmpty(question)) {
    throw new QuestionNotFoundException();
  }
};
