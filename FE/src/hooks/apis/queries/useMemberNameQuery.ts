import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import { getMemberName } from '@/apis/member';

/**
 * GET /member/name
 *
 * 유저의 면접용 이름을 조회하는 api 입니다.
 *
 * ex) 토스에게 인수당한 NDD
 */
const useMemberNameQuery = () => {
  return useQuery({
    queryKey: QUERY_KEY.MEMBER_NICKNAME,
    queryFn: getMemberName,
  });
};

export default useMemberNameQuery;
