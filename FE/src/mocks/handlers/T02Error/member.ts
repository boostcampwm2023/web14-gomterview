import { API } from '@constants/api';
import { http, HttpResponse } from 'msw';
import memberData from '../../data/member.json';

const memberHandlers = [
  http.get(API.MEMBER(), () => {
    return HttpResponse.json(memberData, { status: 200 });
  }),
  http.get(API.MEMBER_NAME(), () => {
    return HttpResponse.json(
      {
        message: '토큰이 만료되었습니다',
        errorCode: 'T02',
      },
      { status: 410 }
    );
  }),
];

export default memberHandlers;
