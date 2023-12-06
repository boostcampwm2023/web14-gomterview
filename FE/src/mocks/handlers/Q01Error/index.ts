import questionHandlers from '@/mocks/handlers/Q01Error/question';
import answerHandlers from '@/mocks/handlers/Q01Error/answer';
import memberHandlers from '@/mocks/handlers/default/member';
import videoHandlers from '@/mocks/handlers/default/video';
import categoryHandlers from '@/mocks/handlers/default/category';
import workbookHandlers from '@/mocks/handlers/default/workbook';

export const Q01ErrorHandlers = [
  ...memberHandlers,
  ...questionHandlers,
  ...answerHandlers,
  ...videoHandlers,
  ...categoryHandlers,
  ...workbookHandlers,
];
