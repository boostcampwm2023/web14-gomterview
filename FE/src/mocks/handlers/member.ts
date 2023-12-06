import { API } from '@/constants/api';
import { http, HttpResponse } from 'msw';
import memberData from '../data/member.json';

const memberHandlers = [
  http.get(API.MEMBER, () => {
    return HttpResponse.json(memberData, { status: 200 });
  }),
  http.get(API.MEMBER_NAME, () => {
    return HttpResponse.json({
      nickname: '토스에서 모셔간 이성인',
    });
  }),
];

export default memberHandlers;
