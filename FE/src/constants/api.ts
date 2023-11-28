export const BASE_URL = process.env.REACT_APP_BASE_API_URL;

type Id = number;
type Hash = string;

export const API = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REISSUE: '/auth/reissue',
  MEMBER: '/member',
  MEMBER_NAME: '/member/name',
  VIDEO: '/video',
  VIDEO_PRE_SIGNED: '/video/pre-signed',
  VIDEO_ALL: '/video/all',
  VIDEO_ID: (id?: Id) => `/video/${id ?? ':id'}`,
  VIDEO_HASH: (hash?: Hash) => `/video/hash/${hash ?? ':hash'}`,
  QUESTION: '/question',
  QUESTION_ID: (id?: Id) => `/question/${id ?? ':id'}`,
  ANSWER: '/answer',
  ANSWER_DEFAULT: '/answer/default',
  ANSWER_ID: (id?: Id) => `/answer/${id ?? ':id'}`,
  CATEGORY: '/category',
  CATEGORY_V2: '/category/v2',
  CATEGORY_ID: (id?: Id) => `/category/${id ?? ':id'}`,
  WORKBOOK: '/workbook',
  WORKBOOK_ID: (id?: Id) => `/workbook/${id ?? ':id'}`,
  WORKBOOK_CATEGORY_ID: (id?: Id) => `/workbook?category=${id ?? ':id'}`,
  WORKBOOK_MY: '/workbook/my',
} as const;
