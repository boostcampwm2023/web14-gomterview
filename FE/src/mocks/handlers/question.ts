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
        questionId: 1,
        questionContent: 'CSS 선택자의 종류에 대해 설명해주세요.',
        answerId: 123,
        answerContent:
          '선택자는 요소를 선택하는 방법을 말합니다. CSS 선택자는 CSS 규칙에 스타일을 적용할 요소를 선택하는 방법을 말합니다. CSS 선택자는 다음과 같이 세 가지 종류로 나눌 수 있습니다. 1. 타입 선택자 2. 클래스 선택자 3. 아이디 선택자',
      },
      {
        questionId: 2,
        questionContent: 'JavaScript의 클로저(Closure)에 대해 설명해주세요.',
        answerId: 1234,
        answerContent:
          '클로저는 함수와 함수가 선언된 어휘적 환경의 조합입니다. 클로저를 이해하려면 자바스크립트의 어휘적 환경에 대한 이해가 필요합니다. 자바스크립트에서 함수는 객체입니다. 그리고 함수가 선언될 때, 그 함수의 LexicalEnvironment는 결정됩니다. LexicalEnvironment는 함수가 선언된 어휘적 환경을 의미합니다. 이 환경은 함수가 선언될 당시의 유효 범위 내에 있는 식별자들로 구성됩니다. 이 환경은 함수가 호출될 때, 그대로 함수와 함께 전달됩니다. 이렇게 함수와 그 함수가 선언된 어휘적 환경이 합쳐진 것을 클로저라고 합니다.',
      },
      {
        questionId: 3,
        questionContent: 'HTML과 XHTML의 차이점은 무엇인가요?',
        answerId: 12345,
        answerContent:
          'HTML은 SGML(Standard Generalized Markup Language)의 약자이며, 웹 문서를 작성하기 위한 가장 기본적인 마크업 언어입니다. XHTML은 XML(Extensible Markup Language)의 약자이며, HTML을 XML로 재정의한 것입니다. XHTML은 HTML보다 엄격하게 작성되어 있습니다. XHTML은 HTML보다 더 많은 규칙을 가지고 있습니다. XHTML은 HTML보다 더 구조적이고 명확한 작성을 요구합니다.',
      },
      {
        questionId: 4,
        questionContent:
          '반응형 웹 디자인과 적응형 웹 디자인의 차이점은 무엇인가요?',
        answerId: 123456,
        answerContent:
          '반응형 웹 디자인은 하나의 웹 사이트를 만들고, 그 웹 사이트를 여러 기기에 맞게 최적화하는 것을 의미합니다. 적응형 웹 디자인은 여러 개의 웹 사이트를 만들고, 각 기기에 맞게 웹 사이트를 제공하는 것을 의미합니다.',
      },
      {
        questionId: 5,
        questionContent: 'CSS의 박스 모델(Box Model)에 대해 설명해주세요.',
        answerId: 1234567,
        answerContent:
          'CSS의 박스 모델은 HTML 요소를 박스로 생각하고, 이 박스를 여러 개의 레이어로 구분한 것입니다. 박스 모델은 다음과 같이 구성됩니다. 1. 콘텐츠(Content) 2. 패딩(Padding) 3. 테두리(Border) 4. 마진(Margin)',
      },
      {
        questionId: 6,
        questionContent: 'CSS의 position 속성에 대해 설명해주세요.',
        answerId: 12345678,
        answerContent:
          'position 속성은 요소의 위치를 지정하는 속성입니다. position 속성은 다음과 같이 5가지 속성값을 가질 수 있습니다. 1. static 2. relative 3. absolute 4. fixed 5. sticky',
      },
      {
        questionId: 7,
        questionContent: 'CSS의 float 속성에 대해 설명해주세요.',
        answerId: 123456789,
        answerContent:
          'float 속성은 요소를 좌우 방향으로 띄우는 속성입니다. float 속성은 다음과 같이 3가지 속성값을 가질 수 있습니다. 1. left 2. right 3. none',
      },
      {
        questionId: 8,
        questionContent: 'CSS의 flexbox에 대해 설명해주세요.',
        answerId: 1234567890,
        answerContent:
          'flexbox는 요소의 크기가 불분명하거나 동적인 경우에도, 요소를 정렬하기 위한 방법입니다. flexbox는 다음과 같이 2가지 속성을 가집니다. 1. flex container 2. flex item',
      },
    ]);
  }),
  http.delete(API.QUESTION_ID(), () => {
    return HttpResponse.json({}, { status: 200 });
  }),
  http.post(API.QUESTION_COPY, ({ request }) => {
    return HttpResponse.json(
      {
        workbookId: 1,
      },
      { status: 201 }
    );
  }),
];

export default questionHandlers;
