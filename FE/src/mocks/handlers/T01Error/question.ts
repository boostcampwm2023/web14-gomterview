import { API } from '@constants/api';
import { HttpResponse, http } from 'msw';

const questionHandlers = [
  http.post(API.QUESTION, () => {
    return HttpResponse.json(
      {
        message: '유효하지 않은 토큰입니다',
        errorCode: 'T01',
      },
      { status: 401 }
    );
  }),
  http.get(API.QUESTION_ID(), () => {
    return HttpResponse.json(
      {
        message: '유효하지 않은 토큰입니다',
        errorCode: 'T01',
      },
      { status: 401 }
    );
  }),
  http.delete(API.QUESTION_ID(), () => {
    return HttpResponse.json(
      {
        message: '유효하지 않은 토큰입니다',
        errorCode: 'T01',
      },
      { status: 401 }
    );
  }),
  http.post(API.QUESTION_COPY, ({ request }) => {
    return HttpResponse.json(
      {
        message: '유효하지 않은 토큰입니다',
        errorCode: 'T01',
      },
      { status: 401 }
    );
  }),
];

export default questionHandlers;
