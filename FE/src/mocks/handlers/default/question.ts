import { API } from '@constants/api';
import { HttpResponse, http } from 'msw';
import questionData from '../../data/question.json';
import { QuestionEntity } from '@/types/question';

const questionHandlers = [
  http.post(API.QUESTION, () => {
    return HttpResponse.json({}, { status: 201 });
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
