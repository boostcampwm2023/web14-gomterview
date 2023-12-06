import memberHandlers from '@/mocks/handlers/serverError/member';
import questionHandlers from '@/mocks/handlers/serverError/question';
import answerHandlers from '@/mocks/handlers/serverError/answer';
import videoHandlers from '@/mocks/handlers/serverError/video';
import categoryHandlers from '@/mocks/handlers/serverError/category';
import workbookHandlers from '@/mocks/handlers/serverError/workbook';

export const serverErrorHandlers = [
  ...memberHandlers,
  ...questionHandlers,
  ...answerHandlers,
  ...videoHandlers,
  ...categoryHandlers,
  ...workbookHandlers,
];
