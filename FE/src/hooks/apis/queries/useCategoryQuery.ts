import { getCategory } from '@/apis/category';
import { QUERY_KEY } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

/**
 * GET /category
 *
 * 문제집의 모든 카테고리 리스트를 조회하는 api입니다.
 *
 * ex) FE, BE, CS, Android
 */
const useCategoryQuery = () => {
  return useQuery({
    queryKey: QUERY_KEY.CATEGORY,
    queryFn: getCategory,
  });
};

export default useCategoryQuery;
