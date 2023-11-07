import { API } from '@/constants/api';
import { HttpResponse, http } from 'msw';

const memberHandlers = [
  http.get(API.MEMBER, () => {
    return HttpResponse.json({
      id: 1,
      email: 'abcd@naver.com',
      nickname: 'admin',
      profileImg:
        'https://us.123rf.com/450wm/tuktukdesign/tuktukdesign1705/tuktukdesign170500052/77461551-%EB%82%A8%EC%9E%90-%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%95%84%EC%9D%B4%EC%BD%98-%EC%82%AC%EB%9E%8C-%ED%94%84%EB%A1%9C%ED%95%84-%EC%95%84%EB%B0%94%ED%83%80-%EA%B8%80%EB%A6%AC%ED%94%84-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8.jpg',
    });
  }),
];

export default memberHandlers;
