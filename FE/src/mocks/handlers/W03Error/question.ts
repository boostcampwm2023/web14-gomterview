import { API } from '@constants/api';
import { HttpResponse, http } from 'msw';

const questionHandlers = [
  http.post(API.QUESTION, () => {
    return HttpResponse.json({}, { status: 201 });
  }),
  http.get(API.QUESTION_ID(), ({ params }) => {
    return HttpResponse.json(
      {
        message: '문제집 id를 입력해주세요.',
        errorCode: 'W03',
      },
      { status: 400 }
    );
  }),
  http.delete(API.QUESTION_ID(), () => {
    return HttpResponse.json({}, { status: 200 });
  }),
  http.post(API.QUESTION_COPY, ({ request }) => {
    return HttpResponse.json(
      {
        workbookId: 1,
      },
      { status: 201 }
    );
  }),
];

export default questionHandlers;
