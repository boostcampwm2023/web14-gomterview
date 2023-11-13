import { Question } from '../entity/question';
import { memberFixture } from '../../member/fixture/member.fixture';
import {CustomQuestionRequest} from "../dto/customQuestionRequest";

export const questionFixture: Question = new Question(
  'CUSTOM',
  'test content',
  [memberFixture],
);

export const customQuestionRequestFixture = {
    content: 'test content',
} as CustomQuestionRequest;