import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/pets', ({ request, params, cookies }) => {
    return HttpResponse.json(['Tom', 'Jerry', 'Spike']);
  }),
];
