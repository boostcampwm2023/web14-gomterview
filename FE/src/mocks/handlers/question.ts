import { API } from '@/constants/api';
import { HttpResponse, http } from 'msw';

const questionHandlers = [
  http.post(API.QUESTION, () => {
    return HttpResponse.json({}, { status: 201 });
  }),
  http.get(API.QUESTION, ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');

    console.log(category);
    return HttpResponse.json([
      {
        id: '1',
        content: 'CSS 선택자의 종류에 대해 설명해주세요.',
      },
      {
        id: '2',
        content: 'JavaScript의 클로저(Closure)에 대해 설명해주세요.',
      },
      {
        id: '3',
        content: 'HTML과 XHTML의 차이점은 무엇인가요?',
      },
      {
        id: '4',
        content: '반응형 웹 디자인과 적응형 웹 디자인의 차이점은 무엇인가요?',
      },
    ]);
  }),
  http.delete(API.QUESTION_ID(), () => {
    return HttpResponse.json({}, { status: 200 });
  }),
];

export default questionHandlers;
