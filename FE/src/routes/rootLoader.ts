import { QueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import { getMemberInfo } from '@/apis/member';

const rootLoader = async ({ queryClient }: { queryClient: QueryClient }) => {
  await queryClient.ensureQueryData({
    queryKey: QUERY_KEY.MEMBER,
    queryFn: getMemberInfo,
  });

  return true;
};

export default rootLoader;
