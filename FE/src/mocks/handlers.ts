import { http, HttpResponse } from 'msw';
import memberHandlers from './handlers/member';
import questionHandlers from './handlers/question';
import answerHandlers from './handlers/answer';

export const handlers = [
  ...memberHandlers,
  ...questionHandlers,
  ...answerHandlers,
];
