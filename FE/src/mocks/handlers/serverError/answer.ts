import { API } from '@constants/api';
import { HttpResponse, http } from 'msw';

const answerHandlers = [
  http.post(API.ANSWER, () => {
    return HttpResponse.json(
      {
        message: '',
        errorCode: 'Server',
      },
      { status: 500 }
    );
  }),
  http.post(API.ANSWER_DEFAULT, ({ request }) => {
    return HttpResponse.json(
      {
        message: '',
        errorCode: 'Server',
      },
      { status: 500 }
    );
  }),
  http.get(API.ANSWER_ID(), ({ params }) => {
    return HttpResponse.json(
      {
        message: '',
        errorCode: 'Server',
      },
      { status: 500 }
    );
  }),
  http.delete(API.ANSWER_ID(), ({ params }) => {
    return HttpResponse.json(
      {
        message: '',
        errorCode: 'Server',
      },
      { status: 500 }
    );
  }),
];

export default answerHandlers;
