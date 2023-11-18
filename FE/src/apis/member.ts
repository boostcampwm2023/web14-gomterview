import getAPIResponseData from '@/utils/getAPIResponseData';
import { API } from '@constants/api';
import { User } from '@/types/user';

export const getMemberInfo = async () => {
  return await getAPIResponseData<User[]>({
    method: 'get',
    url: API.MEMBER,
  });
};
