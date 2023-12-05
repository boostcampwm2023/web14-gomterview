import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import { getWorkbookByCategory } from '@/apis/workbook';

/**
 * GET /workbook?category=${categoryId}
 *
 * categoryId로 해당 카테고리의 모든 문제집을 조회하는 api입니다.
 *
 * 문제집 리스트 페이지에서 사용됩니다.
 */
const useWorkbookListQuery = (categoryId: string) => {
  return useQuery({
    queryKey: QUERY_KEY.WORKBOOK_CATEGORY(categoryId),
    queryFn: () => getWorkbookByCategory(categoryId),
  });
};

export default useWorkbookListQuery;
