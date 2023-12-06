import questionHandlers from '@/mocks/handlers/W02Error/question';
import workbookHandlers from '@/mocks/handlers/W02Error/workbook';
import memberHandlers from '@/mocks/handlers/default/member';
import answerHandlers from '@/mocks/handlers/default/answer';
import videoHandlers from '@/mocks/handlers/default/video';
import categoryHandlers from '@/mocks/handlers/default/category';

export const W02ErrorHandlers = [
  ...memberHandlers,
  ...questionHandlers,
  ...answerHandlers,
  ...videoHandlers,
  ...categoryHandlers,
  ...workbookHandlers,
];
