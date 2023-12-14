import { API } from '@constants/api';
import { http, HttpResponse } from 'msw';

const memberHandlers = [
  http.get(API.MEMBER(), () => {
    return HttpResponse.json(
      {
        message: '유효하지 않은 토큰입니다',
        errorCode: 'T01',
      },
      { status: 401 }
    );
  }),
  http.get(API.MEMBER_NAME(), () => {
    return HttpResponse.json(
      {
        message: '유효하지 않은 토큰입니다',
        errorCode: 'T01',
      },
      { status: 401 }
    );
  }),
];

export default memberHandlers;
