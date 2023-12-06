import { API } from '@constants/api';
import { HttpResponse, http } from 'msw';
import categoryData from '../../data/category.json';

const categoryHandlers = [
  http.get(API.CATEGORY, () => {
    return HttpResponse.json(categoryData, { status: 200 });
  }),
];

export default categoryHandlers;
