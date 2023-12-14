import getAPIResponseData from '@/utils/getAPIResponseData';
import { MemberItemResDto, MemberNameResDto } from '@/types/member';
import { API } from '@constants/api';

export const getMemberInfo = async () => {
  return await getAPIResponseData<MemberItemResDto>({
    method: 'get',
    url: API.MEMBER(),
  });
};

export const getMemberName = async () => {
  return await getAPIResponseData<MemberNameResDto>({
    method: 'get',
    url: API.MEMBER_NAME(),
  });
};
