import { setupWorker } from 'msw/browser';
import { scenarios } from '@/mocks/scenarios';

const isScenarioName = (str: string): str is keyof typeof scenarios => {
  return str in scenarios;
};

const scenarioName =
  new URLSearchParams(window.location.search).get('error') || 'default';
export const worker = setupWorker();

isScenarioName(scenarioName)
  ? worker.use(...scenarios[scenarioName])
  : worker.use(...scenarios.default);
