import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import { getMemberName } from '@/apis/member';

const useMemberNameQuery = () => {
  return useQuery({
    queryKey: QUERY_KEY.MEMBER_NICKNAME,
    queryFn: getMemberName,
  });
};

export default useMemberNameQuery;
