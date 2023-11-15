import { atom } from 'recoil';
import { User } from '@/types/user';

export const userState = atom<{
  userInfo: User | null;
}>({
  key: 'userState',
  default: {
    userInfo: null,
  },
});
