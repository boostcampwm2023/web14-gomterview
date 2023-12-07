import { QueryClient } from '@tanstack/react-query/build/modern/index';
import { QUERY_KEY } from '@constants/queryKey';
import { Params, redirect } from 'react-router-dom';
import { getVideoByHash } from '@/apis/video';
import { PATH } from '@constants/path';

const interviewVideoPublicLoader = async ({
  params,
  queryClient,
}: {
  params: Params<string>;
  queryClient: QueryClient;
}) => {
  const { videoHash = '' } = params;
  await queryClient.ensureQueryData({
    queryKey: QUERY_KEY.VIDEO_HASH(videoHash),
    queryFn: () => getVideoByHash(videoHash),
  });
  const queryState = queryClient.getQueryState(QUERY_KEY.VIDEO_HASH(videoHash));
  return queryState?.data ? null : redirect(PATH.NOT_FOUND);
};

export default interviewVideoPublicLoader;
