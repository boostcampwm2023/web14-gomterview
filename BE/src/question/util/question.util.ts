export const DATA_FORM = {
  CS : 'CS',
  BE:'BE',
  FE:'FE',
  '나만의 질문': 'CUSTOM'
}

export const OUTPUT_FORM = {
  CS : 'CS',
  BE:'BE',
  FE:'FE',
  CUSTOM:'나만의 질문'
}

export const isCategoryCustom = (category: string) => category === 'CUSTOM';

export const questionListExample = [
  { id: 1, category: 'CS', content: 'CS는 무슨 단어의 약자일까?' },
  { id: 2, category: 'FE', content: 'html은 과연 프로그래밍 언어인가?' },
  {
    id: 3,
    category: 'BE',
    content: '백엔드의 MVC의 각 알파벳은 무엇을 의미하는가?',
  },
];