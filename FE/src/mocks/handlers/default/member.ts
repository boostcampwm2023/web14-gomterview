import { API } from '@constants/api';
import { http, HttpResponse } from 'msw';
import memberData from '../../data/member.json';

const memberHandlers = [
  http.get(API.MEMBER(), () => {
    const isLogin =
      new URLSearchParams(window.location.search).get('login') || 'true';
    return HttpResponse.json(memberData, {
      status: isLogin === 'true' ? 200 : 401,
    });
  }),
  http.get(API.MEMBER_NAME(), () => {
    return HttpResponse.json({
      nickname: '토스에서 모셔간 이성인',
    });
  }),
];

export default memberHandlers;
