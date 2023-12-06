import answerHandlers from '@/mocks/handlers/Q02Error/answer';
import memberHandlers from '@/mocks/handlers/default/member';
import questionHandlers from '@/mocks/handlers/default/question';
import videoHandlers from '@/mocks/handlers/default/video';
import categoryHandlers from '@/mocks/handlers/default/category';
import workbookHandlers from '@/mocks/handlers/default/workbook';

export const Q02ErrorHandlers = [
  ...memberHandlers,
  ...questionHandlers,
  ...answerHandlers,
  ...videoHandlers,
  ...categoryHandlers,
  ...workbookHandlers,
];
