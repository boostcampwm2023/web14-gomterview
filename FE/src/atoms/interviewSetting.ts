import { Question } from '@/types/question';
import { atom } from 'recoil';

type PageStatus = 'pending' | 'success' | 'error';
type RecordMethod = 'local' | 'idrive' | 'none' | undefined;

type SelectedQuestion = Question & {
  categoryId: number;
};

export const questionSetting = atom<{
  status: PageStatus;
  selectedData: SelectedQuestion[];
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
