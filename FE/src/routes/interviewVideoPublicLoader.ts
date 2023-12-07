import { QueryClient } from '@tanstack/react-query/build/modern/index';
import { QUERY_KEY } from '@constants/queryKey';
import { Params, redirect } from 'react-router-dom';
import { getVideoByHash } from '@/apis/video';
import axios from 'axios';
import { PATH } from '@constants/path';

const interviewVideoPublicLoader = async ({
  params,
  queryClient,
}: {
  params: Params<string>;
  queryClient: QueryClient;
}) => {
  const { videoHash = '' } = params;
  await queryClient
    .ensureQueryData({
      queryKey: QUERY_KEY.VIDEO_HASH(videoHash),
      queryFn: () => getVideoByHash(videoHash),
    })
    .catch((e) => {
      if (axios.isAxiosError(e)) {
        process.env.NODE_ENV === 'development' && console.error(e.toJSON());
        throw new Response(null, {
          status: e.response?.status ?? 500,
          statusText: e.message,
        });
      }
    });
  const queryState = queryClient.getQueryState(QUERY_KEY.VIDEO_HASH(videoHash));
  return queryState?.data ? null : redirect(PATH.NOT_FOUND);
};

export default interviewVideoPublicLoader;
