import { QUERY_KEY } from '@/constants/queryKey';
import { MemberItemResDto } from '@/types/member';
import { useQueryClient } from '@tanstack/react-query';

const useUserInfo = () => {
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData<MemberItemResDto | undefined>(
    QUERY_KEY.MEMBER
  );
  return userInfo;
};

export default useUserInfo;
