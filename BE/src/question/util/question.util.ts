import { Question } from '../entity/question';
import { categoryFixtureWithId } from '../../category/fixture/category.fixture';
import { CreateQuestionRequest } from '../dto/createQuestionRequest';

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
