import memberHandlers from '@/mocks/handlers/T01Error/member';
import questionHandlers from '@/mocks/handlers/T01Error/question';
import answerHandlers from '@/mocks/handlers/T01Error/answer';
import videoHandlers from '@/mocks/handlers/default/video';
import categoryHandlers from '@/mocks/handlers/default/category';
import workbookHandlers from '@/mocks/handlers/T01Error/workbook';

export const T01ErrorHandlers = [
  ...memberHandlers,
  ...questionHandlers,
  ...answerHandlers,
  ...videoHandlers,
  ...categoryHandlers,
  ...workbookHandlers,
];
