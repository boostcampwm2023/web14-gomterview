import memberHandlers from './member';
import questionHandlers from './question';
import answerHandlers from './answer';
import videoHandlers from '@/mocks/handlers/default/video';
import categoryHandlers from './category';
import workbookHandlers from '@/mocks/handlers/default/workbook';

export const defaultHandlers = [
  ...memberHandlers,
  ...questionHandlers,
  ...answerHandlers,
  ...videoHandlers,
  ...categoryHandlers,
  ...workbookHandlers,
];
