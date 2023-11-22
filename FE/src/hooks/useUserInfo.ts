import { QUERY_KEY } from '@/constants/queryKey';
import { User } from '@/types/user';
import { useQueryClient } from '@tanstack/react-query';

const useUserInfo = () => {
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData<User | undefined>(QUERY_KEY.MEMBER);
  return userInfo;
};

export default useUserInfo;
