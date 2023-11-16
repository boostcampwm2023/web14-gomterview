import { Question } from '../entity/question';
import { memberFixture } from '../../member/fixture/member.fixture';
import { CustomQuestionRequest } from '../dto/customQuestionRequest';

export const questionFixture: Question = new Question(
  'CUSTOM',
  'test content',
  [memberFixture],
);

export const customQuestionRequestFixture = {
  content: 'test content',
} as CustomQuestionRequest;

export const BEQuestionFixture = new Question(
  'BE',
  '관계형 데이터베이스와 NoSQL의 차이는?',
  null,
);
export const FEQuestionFixture = new Question(
  'FE',
  '상태관리를 보통 어떻게 해오시나요?',
  null,
);
export const CSQuestionFixture = new Question(
  'CS',
  '깃의 저장방식에 대해서 설명해보세요',
  null,
);
export const CustomQuestionFixture = new Question(
  'CUSTOM',
  '깃의 저장방식에 대해서 설명해보세요',
  null,
);
export const multiQuestionFixture = [
  BEQuestionFixture,
  FEQuestionFixture,
  CSQuestionFixture,
  CustomQuestionFixture,
];
