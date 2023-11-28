import { SetMetadata } from '@nestjs/common';

export const OPTIONAL_GUARD = 'OptionalGuard';
export const OptionalGuard = () => {
  return SetMetadata(OPTIONAL_GUARD, true);
};
