import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import { getWorkbookTitle } from '@/apis/workbook';

/**
 * GET /workbook/title
 *
 * 나의 문제집 제목을 조회하는 api입니다.
 *
 * 비회원은 탑5 문제집이 조회되고, 회원은 나의 문제집이 조회됩니다.
 */
const useWorkbookTitleListQuery = () => {
  return useQuery({
    queryKey: QUERY_KEY.WORKBOOK_TITLE,
    queryFn: () => getWorkbookTitle(),
  });
};

export default useWorkbookTitleListQuery;
