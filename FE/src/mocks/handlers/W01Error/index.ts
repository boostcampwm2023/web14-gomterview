import questionHandlers from '@/mocks/handlers/W01Error/question';
import workbookHandlers from '@/mocks/handlers/W01Error/workbook';
import memberHandlers from '@/mocks/handlers/default/member';
import answerHandlers from '@/mocks/handlers/default/answer';
import videoHandlers from '@/mocks/handlers/default/video';
import categoryHandlers from '@/mocks/handlers/default/category';

export const W01ErrorHandlers = [
  ...memberHandlers,
  ...questionHandlers,
  ...answerHandlers,
  ...videoHandlers,
  ...categoryHandlers,
  ...workbookHandlers,
];
