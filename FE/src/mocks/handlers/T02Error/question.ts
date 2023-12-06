import { API } from '@constants/api';
import { HttpResponse, http } from 'msw';

const questionHandlers = [
  http.post(API.QUESTION, () => {
    return HttpResponse.json(
      {
        message: '토큰이 만료되었습니다',
        errorCode: 'T02',
      },
      { status: 410 }
    );
  }),
  http.get(API.QUESTION_ID(), () => {
    return HttpResponse.json(
      {
        message: '토큰이 만료되었습니다',
        errorCode: 'T02',
      },
      { status: 410 }
    );
  }),
  http.delete(API.QUESTION_ID(), () => {
    return HttpResponse.json(
      {
        message: '토큰이 만료되었습니다',
        errorCode: 'T02',
      },
      { status: 410 }
    );
  }),
  http.post(API.QUESTION_COPY, ({ request }) => {
    return HttpResponse.json(
      {
        message: '토큰이 만료되었습니다',
        errorCode: 'T02',
      },
      { status: 410 }
    );
  }),
];

export default questionHandlers;
