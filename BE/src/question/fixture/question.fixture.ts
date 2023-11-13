import { Question } from '../entity/question';
import { memberFixture } from '../../member/fixture/member.fixture';

export const questionFixture: Question = new Question(
  'CUSTOM',
  'test content',
  [memberFixture],
);
