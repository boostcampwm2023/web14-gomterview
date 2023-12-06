import { defaultHandlers } from '@/mocks/handlers/default';
import { T02ErrorHandlers } from '@/mocks/handlers/T02Error';
import { T01ErrorHandlers } from '@/mocks/handlers/T01Error';
import { V01ErrorHandlers } from '@/mocks/handlers/V01Error';
import { A01ErrorHandlers } from '@/mocks/handlers/A01Error';
import { A02ErrorHandlers } from '@/mocks/handlers/A02Error';
import { C02ErrorHandlers } from '@/mocks/handlers/C02Error';
import { M01ErrorHandlers } from '@/mocks/handlers/M01Error';
import { Q01ErrorHandlers } from '@/mocks/handlers/Q01Error';
import { Q02ErrorHandlers } from '@/mocks/handlers/Q02Error';
import { serverErrorHandlers } from '@/mocks/handlers/serverError';
import { V02ErrorHandlers } from '@/mocks/handlers/V02Error';
import { V03ErrorHandlers } from '@/mocks/handlers/V03Error';
import { V04ErrorHandlers } from '@/mocks/handlers/V04Error';
import { V05ErrorHandlers } from '@/mocks/handlers/V05Error';
import { V06ErrorHandlers } from '@/mocks/handlers/V06Error';
import { V07ErrorHandlers } from '@/mocks/handlers/V07Error';
import { V08ErrorHandlers } from '@/mocks/handlers/V08Error';
import { W01ErrorHandlers } from '@/mocks/handlers/W01Error';
import { W02ErrorHandlers } from '@/mocks/handlers/W02Error';
import { W03ErrorHandlers } from '@/mocks/handlers/W03Error';

export const scenarios = {
  default: defaultHandlers,
  a01: A01ErrorHandlers,
  a02: A02ErrorHandlers,
  c02: C02ErrorHandlers,
  m01: M01ErrorHandlers,
  q01: Q01ErrorHandlers,
  q02: Q02ErrorHandlers,
  server: serverErrorHandlers,
  t01: T01ErrorHandlers,
  t02: T02ErrorHandlers,
  v01: V01ErrorHandlers,
  v02: V02ErrorHandlers,
  v03: V03ErrorHandlers,
  v04: V04ErrorHandlers,
  v05: V05ErrorHandlers,
  v06: V06ErrorHandlers,
  v07: V07ErrorHandlers,
  v08: V08ErrorHandlers,
  w01: W01ErrorHandlers,
  w02: W02ErrorHandlers,
  w03: W03ErrorHandlers,
};
