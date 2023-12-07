import { QUERY_KEY } from '@constants/queryKey';
import { QueryClient } from '@tanstack/react-query';
import { redirect } from 'react-router-dom';
import { PATH } from '@constants/path';
import { getMemberInfo } from '@/apis/member';
import axios from 'axios';

const myPageLoader = async ({ queryClient }: { queryClient: QueryClient }) => {
  await queryClient
    .ensureQueryData({
      queryKey: QUERY_KEY.MEMBER,
      queryFn: getMemberInfo,
    })
    .catch((e) => {
      if (axios.isAxiosError(e)) {
        process.env.NODE_ENV === 'development' && console.error(e.toJSON());
      }
    });
  const queryState = queryClient.getQueryState(QUERY_KEY.MEMBER);
  return queryState?.data ? null : redirect(PATH.ROOT);
};

export default myPageLoader;
