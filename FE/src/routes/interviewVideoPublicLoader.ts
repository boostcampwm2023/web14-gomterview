import { QueryClient } from '@tanstack/react-query/build/modern/index';
import { QUERY_KEY } from '@constants/queryKey';
import { Params } from 'react-router-dom';
import { getVideoByHash } from '@/apis/video';

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
  return null;
};

export default interviewVideoPublicLoader;
