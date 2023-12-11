import { atom } from 'recoil';

const mediaConnectStatus = [
  'connect', //스트림 생성, 비디오 연결 완료 상태
  'initial', //초기상태
  'fail', //위 과정중 어디선가 오류가 발생했을 때
] as const;
export type ConnectStatus = (typeof mediaConnectStatus)[number];

export const mediaState = atom<MediaStream | null>({
  key: 'mediaState',
  default: null,
});

export const connectStatusState = atom<ConnectStatus>({
  key: 'connectStatusState',
  default: 'initial',
});

export const selectedMimeTypeState = atom<string>({
  key: 'selectedMimeTypeState',
  default: '',
});
