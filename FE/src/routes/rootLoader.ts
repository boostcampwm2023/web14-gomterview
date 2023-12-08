import { QueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import { getMemberInfo } from '@/apis/member';
import axios from 'axios';

const rootLoader = async ({ queryClient }: { queryClient: QueryClient }) => {
  !queryClient.getQueryState(QUERY_KEY.MEMBER) &&
    (await queryClient
      .prefetchQuery({
        queryKey: QUERY_KEY.MEMBER,
        queryFn: getMemberInfo,
      })
      .catch((e) => {
        if (axios.isAxiosError(e)) {
          process.env.NODE_ENV === 'development' && console.error(e.toJSON());
        }
      }));

  return true;
};

export default rootLoader;
