import { API } from '@constants/api';
import { HttpResponse, http } from 'msw';
import questionData from '../../data/question.json';
import { QuestionEntity } from '@/types/question';

const questionHandlers = [
  http.post(API.QUESTION, () => {
    return HttpResponse.json(
      {
        message: '문제집에 대한 권한이 없습니다.',
        errorCode: 'W02',
      },
      { status: 403 }
    );
  }),
  http.get(API.QUESTION_ID(), ({ params }) => {
    const { id: workbookId } = params;
    const workbookIdMap = new Map<number, QuestionEntity[]>();
    questionData.forEach((question) => {
      workbookIdMap.has(question.workbookId)
        ? workbookIdMap.get(question.workbookId)!.push(question)
        : workbookIdMap.set(question.workbookId, [question]);
    });
    return HttpResponse.json(workbookIdMap.get(Number(workbookId)), {
      status: 200,
    });
  }),
  http.delete(API.QUESTION_ID(), () => {
    return HttpResponse.json(
      {
        message: '문제집에 대한 권한이 없습니다.',
        errorCode: 'W02',
      },
      { status: 403 }
    );
  }),
  http.post(API.QUESTION_COPY, ({ request }) => {
    return HttpResponse.json(
      {
        message: '문제집에 대한 권한이 없습니다.',
        errorCode: 'W02',
      },
      { status: 403 }
    );
  }),
];

export default questionHandlers;
