import { API } from '@/constants/api';
import { HttpResponse, http } from 'msw';

const categoryHandlers = [
  http.get(API.CATEGORY, () => {
    return HttpResponse.json(
      [
        {
          id: 11,
          name: 'FE',
        },
        {
          id: 12,
          name: 'BE',
        },
        {
          id: 13,
          name: 'CS',
        },
        {
          id: 14,
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
