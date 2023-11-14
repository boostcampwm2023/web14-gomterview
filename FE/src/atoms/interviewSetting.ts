import { atom } from 'recoil';

type PageStatus = 'pending' | 'success' | 'error';
type RecordMethod = 'local' | 'idrive' | 'none' | undefined;

type SelectedData = {
  id: number;
  content: string;
  answer: string;
};

export const questionSetting = atom<{
  status: PageStatus;
  selectedData: SelectedData[];
}>({
  key: 'questionSetting',
  default: {
    status: 'pending',
    selectedData: [],
  },
});

export const videoSetting = atom<{
  status: PageStatus;
}>({
  key: 'videoSetting',
  default: {
    status: 'pending',
  },
});

export const recordSetting = atom<{
  status: PageStatus;
  method: RecordMethod;
}>({
  key: 'recordSetting',
  default: {
    status: 'pending',
    method: undefined,
  },
});
