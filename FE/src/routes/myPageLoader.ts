import { QUERY_KEY } from '@constants/queryKey';
import { QueryClient } from '@tanstack/react-query';
import { redirect } from 'react-router-dom';
import { PATH } from '@constants/path';

const myPageLoader = ({ queryClient }: { queryClient: QueryClient }) => {
  const queryState = queryClient.getQueryState(QUERY_KEY.MEMBER);

  return queryState?.data ? null : redirect(PATH.ROOT);
};

export default myPageLoader;
