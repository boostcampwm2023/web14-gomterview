import { setupWorker } from 'msw/browser';
import { scenarios } from '@/mocks/scenarios';

export const worker = setupWorker();

worker.use(...scenarios.default);
