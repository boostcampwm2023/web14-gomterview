import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import { getVideoById } from '@/apis/video';

/**
 * GET /video/${videoId}
 *
 * videoId로 비디오 정보를 조회하는 api 입니다.
 *
 * 비공개된 비디오를 조회할 때 사용합니다.
 */
const useVideoItemQuery = (videoId: number) => {
  return useQuery({
    queryKey: QUERY_KEY.VIDEO_ID(videoId),
    queryFn: () => getVideoById(videoId),
  });
};

export default useVideoItemQuery;
