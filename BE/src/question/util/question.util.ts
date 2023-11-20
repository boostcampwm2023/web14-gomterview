import { Question } from '../entity/question';
import { categoryFixtureWithId } from '../../category/fixture/category.fixture';
import { CreateQuestionRequest } from '../dto/createQuestionRequest';

export const questionFixture = new Question(
  100,
  'tester',
  categoryFixtureWithId,
  null,
  new Date(),
);

export const createQuestionRequestFixture = new CreateQuestionRequest(
  categoryFixtureWithId.id,
  'tester',
);
