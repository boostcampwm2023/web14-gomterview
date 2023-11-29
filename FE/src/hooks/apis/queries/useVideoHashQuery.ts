import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import { getVideoByHash } from '@/apis/video';

/**
 * GET /video/hash/${hash}
 *
 * 비디오 해시값으로 비디오 정보를 조회하는 api입니다.
 *
 * 공개된 비디오를 조회할 때 사용합니다.
 */
const useVideoHashQuery = (hash: string) => {
  return useQuery({
    queryKey: QUERY_KEY.VIDEO_HASH(hash),
    queryFn: () => getVideoByHash(hash),
  });
};

export default useVideoHashQuery;
