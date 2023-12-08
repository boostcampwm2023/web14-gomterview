import { QueryClient } from '@tanstack/react-query';

const myPageLoader = ({ queryClient }: { queryClient: QueryClient }) => {
  // await queryClient
  //   .ensureQueryData({
  //     queryKey: QUERY_KEY.MEMBER,
  //     queryFn: getMemberInfo,
  //   })
  //   .catch((e) => {
  //     if (axios.isAxiosError(e)) {
  //       process.env.NODE_ENV === 'development' && console.error(e.toJSON());
  //     }
  //   });
  // const queryState = queryClient.getQueryState(QUERY_KEY.MEMBER);
  // return queryState?.data ? null : redirect(PATH.ROOT);
  return null;
};

export default myPageLoader;
