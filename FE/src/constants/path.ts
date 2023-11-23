const INTERVIEW = 'interview';
const SETTING = 'setting';
const CONNECTION = 'connection';
const RECORD = 'record';
const MYPAGE = 'mypage';
const QUESTION = 'question';

export const PATH = {
  ROOT: '/',
  INTERVIEW: `/${INTERVIEW}`,
  INTERVIEW_SETTING: `/${INTERVIEW}/${SETTING}`,
  INTERVIEW_SETTING_CONNECTION: `/${INTERVIEW}/${SETTING}/${CONNECTION}`,
  INTERVIEW_SETTING_RECORD: `/${INTERVIEW}/${SETTING}/${RECORD}`,
  MYPAGE: `/${MYPAGE}`,
  INTERVIEW_VIDEO: (videoId?: number) =>
    `/${INTERVIEW}/${videoId ?? ':videoId'}`,
  INTERVIEW_VIDEO_PUBLIC: (videoHash?: string) =>
    `/${INTERVIEW}/public/${videoHash ?? ':videoHash'}`,
  NOT_FOUND: `/404`,
};

export const SETTING_PATH = {
  CONNECTION: `${CONNECTION}`,
  RECORD: `${RECORD}`,
  QUESTION: `${QUESTION}`,
};
