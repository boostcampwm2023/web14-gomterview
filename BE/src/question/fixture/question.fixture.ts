import { Question } from '../entity/question';
import { CreateQuestionRequest } from '../dto/createQuestionRequest';
import { workbookFixtureWithId } from '../../workbook/fixture/workbook.fixture';
import { CopyQuestionRequest } from '../dto/copyQuestionRequest';

export const questionFixture = new Question(
  1,
  'tester',
  workbookFixtureWithId,
  null,
  new Date(),
  null,
);

export const createQuestionRequestFixture = new CreateQuestionRequest(
  workbookFixtureWithId.id,
  'tester',
);

export const copyQuestionRequestFixture = new CopyQuestionRequest(
  workbookFixtureWithId.id,
  [1, 2, 3],
);
