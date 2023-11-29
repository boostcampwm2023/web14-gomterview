import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import { getVideoList } from '@/apis/video';

/**
 * GET /video/all
 *
 * 자신이 촬영한 모든 비디오 목록을 조회하는 api입니다.
 *
 * 마이페이지에서 사용됩니다.
 */
const useVideoListQuery = () => {
  return useQuery({
    queryKey: QUERY_KEY.VIDEO,
    queryFn: () => getVideoList(),
  });
};

export default useVideoListQuery;
