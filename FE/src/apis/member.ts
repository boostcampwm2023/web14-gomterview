import getAPIResponseData from '@/utils/getAPIResponseData';
import { User } from '@/types/user';
import { API } from '@constants/api';

export const getMemberInfo = async () => {
  return await getAPIResponseData<User>({
    method: 'get',
    url: API.MEMBER,
  });
};
