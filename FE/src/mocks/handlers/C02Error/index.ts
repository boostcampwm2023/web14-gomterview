import categoryHandlers from '@/mocks/handlers/C02Error/category';
import memberHandlers from '@/mocks/handlers/default/member';
import questionHandlers from '@/mocks/handlers/default/question';
import answerHandlers from '@/mocks/handlers/default/answer';
import videoHandlers from '@/mocks/handlers/default/video';
import workbookHandlers from '@/mocks/handlers/default/workbook';

export const C02ErrorHandlers = [
  ...memberHandlers,
  ...questionHandlers,
  ...answerHandlers,
  ...videoHandlers,
  ...categoryHandlers,
  ...workbookHandlers,
];
