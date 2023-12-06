import { API } from '@constants/api';
import { HttpResponse, http } from 'msw';
import { AnswerEntity } from '@/types/answer';
import answerData from '@/mocks/data/answer.json';

const answerHandlers = [
  http.post(API.ANSWER, () => {
    return HttpResponse.json(
      {
        message: '유효하지 않은 토큰입니다',
        errorCode: 'T01',
      },
      { status: 401 }
    );
  }),
  http.post(API.ANSWER_DEFAULT, ({ request }) => {
    return HttpResponse.json(
      {
        message: '유효하지 않은 토큰입니다',
        errorCode: 'T01',
      },
      { status: 401 }
    );
  }),
  http.get(API.ANSWER_ID(), ({ params }) => {
    const { id: answerId } = params;
    const answerIdMap = new Map<number, AnswerEntity[]>();
    answerData.forEach((answer) => {
      answerIdMap.has(answer.answerId)
        ? answerIdMap.get(answer.answerId)!.push(answer)
        : answerIdMap.set(answer.answerId, [answer]);
    });
    return HttpResponse.json(answerIdMap.get(Number(answerId)));
  }),
  http.delete(API.ANSWER_ID(), ({ params }) => {
    return HttpResponse.json(
      {
        message: '유효하지 않은 토큰입니다',
        errorCode: 'T01',
      },
      { status: 401 }
    );
  }),
];

export default answerHandlers;
