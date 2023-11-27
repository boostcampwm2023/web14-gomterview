import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import { getVideoList } from '@/apis/video';

const useVideoListQuery = () => {
  return useQuery({
    queryKey: QUERY_KEY.VIDEO,
    queryFn: () => getVideoList(),
  });
};

export default useVideoListQuery;
