import { API } from '@constants/api';
import { HttpResponse, http } from 'msw';

const categoryHandlers = [
  http.get(API.CATEGORY, () => {
    return HttpResponse.json(
      {
        message: '카테고리가 존재하지 않습니다.',
        errorCode: 'C02',
      },
      { status: 404 }
    );
  }),
];

export default categoryHandlers;
