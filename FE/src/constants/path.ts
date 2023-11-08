const INTERVIEW = 'interview';
const SETTING = 'setting';
const CONNECTION = 'connection';
const RECORD = 'record';
const MYPAGE = 'mypage';

export const PATH = {
  ROOT: '/',
  INTERVIEW: `/${INTERVIEW}`,
  INTERVIEW_SETTING: `/${INTERVIEW}/${SETTING}`,
  INTERVIEW_SETTING_CONNECTION: `/${INTERVIEW}/${SETTING}/${CONNECTION}`,
  INTERVIEW_SETTING_RECORD: `/${INTERVIEW}/${SETTING}/${RECORD}`,
  MYPAGE: `/${MYPAGE}`,
  CONNECTION: `${CONNECTION}`,
  RECORD: `${RECORD}`,
  INTERVIEW_VIDEO: `/${INTERVIEW}/:videoId`,
};
