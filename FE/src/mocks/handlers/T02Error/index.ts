import memberHandlers from '@/mocks/handlers/T02Error/member';
import videoHandlers from '@/mocks/handlers/default/video';
import questionHandlers from '@/mocks/handlers/T02Error/question';
import workbookHandlers from '@/mocks/handlers/T02Error/workbook';
import answerHandlers from '@/mocks/handlers/T02Error/answer';
import categoryHandlers from '@/mocks/handlers/default/category';

export const T02ErrorHandlers = [
  ...memberHandlers,
  ...questionHandlers,
  ...answerHandlers,
  ...videoHandlers,
  ...categoryHandlers,
  ...workbookHandlers,
];
