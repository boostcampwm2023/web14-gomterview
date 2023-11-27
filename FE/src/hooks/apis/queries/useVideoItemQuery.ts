import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import { getVideoById } from '@/apis/video';

const useVideoItemQuery = (videoId: number) => {
  return useQuery({
    queryKey: QUERY_KEY.VIDEO_ID(videoId),
    queryFn: () => getVideoById(videoId),
  });
};

export default useVideoItemQuery;
