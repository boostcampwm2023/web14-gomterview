import { API } from '@/constants/api';
import { HttpResponse, http } from 'msw';

const answerHandlers = [
  http.post(API.ANSWER, () => {
    return HttpResponse.json({}, { status: 201 });
  }),
  http.post(API.ANSWER_DEFAULT, ({ request }) => {
    return HttpResponse.json({}, { status: 201 });
  }),
  http.get(API.ANSWER, () => {
    return HttpResponse.json([
      {
        answerId: '1',
        questionId: '1',
        content:
          'CSS 선택자에는 여러 종류가 있습니다. 기본적으로 태그 선택자, 클래스 선택자, ID 선택자가 있으며, 이 외에도 자식 선택자, 인접 형제 선택자, 속성 선택자 등이 있습니다. 각 선택자는 스타일을 적용할 HTML 요소를 다른 방식으로 지정합니다.',
      },
      {
        answerId: '2',
        questionId: '2',
        content:
          '클로저는 함수와 그 함수가 선언된 렉시컬 환경의 조합입니다. 클로저를 통해 내부 함수는 외부 함수의 변수에 접근할 수 있습니다. 이는 데이터 은닉과 캡슐화에 유용합니다.',
      },
      {
        answerId: '3',
        questionId: '3',
        content:
          '반응형 웹 디자인은 하나의 HTML 코드에 CSS 미디어 쿼리를 사용하여 다양한 화면 크기와 해상도에 맞게 콘텐츠를 조정합니다. 적응형 웹 디자인은 여러 고정된 레이아웃을 만들고, 디바이스의 화면 크기에 따라 적절한 레이아웃을 제공합니다.',
      },
    ]);
  }),
  http.delete(API.ANSWER_ID(), ({ params }) => {
    const { id } = params;
    console.log(id);

    return HttpResponse.json({}, { status: 200 });
  }),
];

export default answerHandlers;
