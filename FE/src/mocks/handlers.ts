import memberHandlers from './handlers/member';
import questionHandlers from './handlers/question';
import answerHandlers from './handlers/answer';
import videoHandlers from '@/mocks/handlers/video';
import categoryHandlers from './handlers/category';
import workbookHandlers from '@/mocks/handlers/workbook';

export const handlers = [
  ...memberHandlers,
  ...questionHandlers,
  ...answerHandlers,
  ...videoHandlers,
  ...categoryHandlers,
  ...workbookHandlers,
];
