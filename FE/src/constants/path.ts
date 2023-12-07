const INTERVIEW = 'interview';
const SETTING = 'setting';
const CONNECTION = 'connection';
const RECORD = 'record';
const MYPAGE = 'mypage';
const QUESTION = 'question';
const TERMS = 'terms';
const WORKBOOK = 'workbook';

export const PATH = {
  ROOT: '/',
  INTERVIEW: `/${INTERVIEW}`,
  INTERVIEW_SETTING: `/${INTERVIEW}/${SETTING}`,
  INTERVIEW_SETTING_CONNECTION: `/${INTERVIEW}/${SETTING}?page=${CONNECTION}`,
  INTERVIEW_SETTING_RECORD: `/${INTERVIEW}/${SETTING}/${RECORD}`,
  MYPAGE: `/${MYPAGE}`,
  INTERVIEW_VIDEO: (videoId?: number) =>
    `/${INTERVIEW}/${videoId ?? ':videoId'}`,
  INTERVIEW_VIDEO_PUBLIC: (videoHash?: string) =>
    `/${INTERVIEW}/public/${videoHash ?? ':videoHash'}`,
  INTERVIEW_WORKBOOK_DETAIL: (workbookId?: number) =>
    `/${INTERVIEW}/${WORKBOOK}/${workbookId ?? ':workbookId'}`,
  NOT_FOUND: `/404`,
  WORKBOOK: `/${WORKBOOK}`,
};

export const SETTING_PATH = {
  CONNECTION: `${CONNECTION}`,
  RECORD: `${RECORD}`,
  QUESTION: `${QUESTION}`,
  TERMS: `${TERMS}`,
};
