export const BASE_URL = '';

type Id = number;

export const API = {
  MEMBER: '/member',
  VIDEO: '/video',
  VIDEO_ALL: '/video/all',
  VIDEO_ID: (id?: Id) => `/video/${id ?? ':id'}`,
  QUESTION: '/question',
  QUESTION_ID: (id?: Id) => `/question/${id ?? ':id'}`,
  ANSWER: '/answer',
  ANSWER_DEFAULT: '/answer/default',
  ANSWER_ID: (id?: Id) => `/answer/${id ?? ':id'}`,
};
