import { Answer } from '../entity/answer';
import { memberFixture } from '../../member/fixture/member.fixture';
import { questionFixture } from '../../question/util/question.util';
import { CreateAnswerRequest } from '../dto/createAnswerRequest';

export const answerFixture = Answer.of(
  'testContent',
  memberFixture,
  questionFixture,
);

export const createAnswerRequestFixture = new CreateAnswerRequest(
  questionFixture.id,
  'test',
);
