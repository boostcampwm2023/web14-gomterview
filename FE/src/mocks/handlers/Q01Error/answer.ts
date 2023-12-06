import { API } from '@constants/api';
import { HttpResponse, http } from 'msw';

const answerHandlers = [
  http.post(API.ANSWER, () => {
    return HttpResponse.json(
      {
        message: '해당 질문을 찾을 수 없습니다.',
        errorCode: 'Q01',
      },
      { status: 404 }
    );
  }),
  http.post(API.ANSWER_DEFAULT, ({ request }) => {
    return HttpResponse.json(
      {
        message: '해당 질문을 찾을 수 없습니다.',
        errorCode: 'Q01',
      },
      { status: 404 }
    );
  }),
  http.get(API.ANSWER_ID(), ({ params }) => {
    return HttpResponse.json(
      {
        message: '해당 질문을 찾을 수 없습니다.',
        errorCode: 'Q01',
      },
      { status: 404 }
    );
  }),
  http.delete(API.ANSWER_ID(), ({ params }) => {
    return HttpResponse.json({}, { status: 200 });
  }),
];

export default answerHandlers;
