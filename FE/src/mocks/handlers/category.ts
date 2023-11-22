import { API } from '@/constants/api';
import { HttpResponse, http } from 'msw';

const categoryHandlers = [
  http.get(API.CATEGORY, () => {
    return HttpResponse.json(
      {
        customCategory: {
          id: 4,
          name: '나만의 질문',
        },
        categories: [
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
        ],
      },

      { status: 200 }
    );
  }),
];

export default categoryHandlers;
