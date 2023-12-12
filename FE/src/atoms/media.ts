import { atom } from 'recoil';

const mediaConnectStatus = [
  'start', //스트림이 생성된 상태
  'connect', //스트림이 비디오에 연결된 상태
  'pending', //초기상태
  'fail', //위 과정중 어디선가 오류가 발생했을 때
] as const;
export type ConnectStatus = (typeof mediaConnectStatus)[number];

export const mediaState = atom<MediaStream | null>({
  key: 'mediaState',
  default: null,
});

export const connectStatusState = atom<ConnectStatus>({
  key: 'connectStatusState',
  default: 'pending',
});

export const selectedMimeTypeState = atom<string>({
  key: 'selectedMimeTypeState',
  default: '',
});
