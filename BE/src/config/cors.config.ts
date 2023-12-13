import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { CORS_HEADERS, CORS_ORIGIN } from './cors.secure';

export const CORS_CONFIG: CorsOptions = {
  origin: CORS_ORIGIN,
  credentials: true,
  exposedHeaders: CORS_HEADERS,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTION', 'HEADER'],
};
