import { QueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import { getMemberInfo } from '@/apis/member';
import { redirect } from 'react-router-dom';
import { PATH } from '@constants/path';

const myPageLoader = async ({ queryClient }: { queryClient: QueryClient }) => {
  const data = await queryClient.ensureQueryData({
    queryKey: QUERY_KEY.MEMBER,
    queryFn: getMemberInfo,
  });

  return data ? null : redirect(PATH.ROOT);
};

export default myPageLoader;
