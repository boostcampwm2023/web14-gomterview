import { Answer } from '../entity/answer';
import { memberFixture } from '../../member/fixture/member.fixture';
import { questionFixture } from '../../question/fixture/question.fixture';
import { CreateAnswerRequest } from '../dto/createAnswerRequest';
import { DefaultAnswerRequest } from '../dto/defaultAnswerRequest';

export const answerFixture = Answer.of(
  'testContent',
  memberFixture,
  questionFixture,
);

export const createAnswerRequestFixture = new CreateAnswerRequest(
  questionFixture.id,
  'test',
);

export const defaultAnswerRequestFixture = new DefaultAnswerRequest(
  questionFixture.id,
  answerFixture.id,
);
