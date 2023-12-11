import { atom } from 'recoil';

const mediaConnectStatus = [
  'setup', //스트림 초기상태 설정. 비디오는 연결 전
  'connect', //비디오 연결 완료 상태
  'disconnect', //비디오 연결 해제. 스트림은 초기화된 상태
  'initial', //스트림 x, 비디오 연결도 x
  'fail', //위 과정중 어디선가 오류가 발생했을 대
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
