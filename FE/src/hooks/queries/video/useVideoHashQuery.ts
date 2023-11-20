import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import { getVideoByHash } from '@/apis/video';

const useVideoHashQuery = (hash: string) => {
  return useQuery({
    queryKey: QUERY_KEY.VIDEO,
    queryFn: () => getVideoByHash(hash),
  });
};

export default useVideoHashQuery;
