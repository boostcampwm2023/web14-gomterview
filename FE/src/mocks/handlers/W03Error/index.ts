import questionHandlers from '@/mocks/handlers/W03Error/question';
import memberHandlers from '@/mocks/handlers/default/member';
import answerHandlers from '@/mocks/handlers/default/answer';
import videoHandlers from '@/mocks/handlers/default/video';
import categoryHandlers from '@/mocks/handlers/default/category';
import workbookHandlers from '@/mocks/handlers/default/workbook';

export const W03ErrorHandlers = [
  ...memberHandlers,
  ...questionHandlers,
  ...answerHandlers,
  ...videoHandlers,
  ...categoryHandlers,
  ...workbookHandlers,
];
