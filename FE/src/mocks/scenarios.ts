import { defaultHandlers } from '@/mocks/handlers/default';
import { T02ErrorHandlers } from '@/mocks/handlers/T02Error';
import { T01ErrorHandlers } from '@/mocks/handlers/T01Error';

export const scenarios = {
  default: defaultHandlers,
  t01: T01ErrorHandlers,
  t02: T02ErrorHandlers,
};
