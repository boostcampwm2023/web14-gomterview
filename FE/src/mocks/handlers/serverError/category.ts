import { API } from '@constants/api';
import { HttpResponse, http } from 'msw';

const categoryHandlers = [
  http.get(API.CATEGORY, () => {
    return HttpResponse.json(
      {
        message: '',
        errorCode: 'Server',
      },
      { status: 500 }
    );
  }),
];

export default categoryHandlers;
