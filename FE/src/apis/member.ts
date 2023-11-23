import getAPIResponseData from '@/utils/getAPIResponseData';
import { User, UserNameResDto } from '@/types/user';
import { API } from '@constants/api';

export const getMemberInfo = async () => {
  return await getAPIResponseData<User>({
    method: 'get',
    url: API.MEMBER,
  });
};

export const getMemberName = async () => {
  return await getAPIResponseData<UserNameResDto>({
    method: 'get',
    url: API.MEMBER_NAME,
  });
};
