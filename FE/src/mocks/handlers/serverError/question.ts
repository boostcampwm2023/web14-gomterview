import { API } from '@constants/api';
import { HttpResponse, http } from 'msw';

const questionHandlers = [
  http.post(API.QUESTION, () => {
    return HttpResponse.json(
      {
        message: '',
        errorCode: 'Server',
      },
      { status: 500 }
    );
  }),
  http.get(API.QUESTION_ID(), ({ params }) => {
    return HttpResponse.json(
      {
        message: '',
        errorCode: 'Server',
      },
      { status: 500 }
    );
  }),
  http.delete(API.QUESTION_ID(), () => {
    return HttpResponse.json(
      {
        message: '',
        errorCode: 'Server',
      },
      { status: 500 }
    );
  }),
  http.post(API.QUESTION_COPY, ({ request }) => {
    return HttpResponse.json(
      {
        message: '',
        errorCode: 'Server',
      },
      { status: 500 }
    );
  }),
];

export default questionHandlers;
