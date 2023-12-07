import 'dotenv/config';

export const BEARER_PREFIX: string = 'Bearer ';

export const companies = [
  '네이버',
  '카카오',
  '라인',
  '쿠팡',
  '우아한형제들',
  '당근',
  '비바리퍼블리카',
  'Microsoft',
  'Apple',
  'Google',
  'Amazon',
  'Meta',
];
export const DEFAULT_THUMBNAIL = process.env.DEFAULT_THUMBNAIL;

export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const FORBIDDEN = 403;
export const NOT_FOUND = 404;
export const GONE = 410;
export const INTERNAL_SERVER_ERROR = 500;

export const ACCESS_TOKEN_EXPIRES_IN = '1h'; // 1 시간
export const REFRESH_TOKEN_EXPIRES_IN = '7d'; // 7 일
