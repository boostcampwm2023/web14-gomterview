import { API } from '@/constants/api';
import { HttpResponse, http } from 'msw';

const categoryHandlers = [
  http.get(API.CATEGORY, () => {
    return HttpResponse.json(
      [
        {
          id: 1,
          name: 'FE',
        },
        {
          id: 2,
          name: 'BE',
        },
        {
          id: 3,
          name: 'CS',
        },
        {
          id: 4,
          name: 'Android',
        },
        {
          id: 5,
          name: 'iOS',
        },
      ],
      { status: 200 }
    );
  }),
];

export default categoryHandlers;
