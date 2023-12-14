import { API } from '@constants/api';
import { http, HttpResponse } from 'msw';

const memberHandlers = [
  http.get(API.MEMBER(), () => {
    return HttpResponse.json(
      {
        message: '',
        errorCode: 'Server',
      },
      { status: 500 }
    );
  }),
  http.get(API.MEMBER_NAME(), () => {
    return HttpResponse.json(
      {
        message: '',
        errorCode: 'Server',
      },
      { status: 500 }
    );
  }),
];

export default memberHandlers;
