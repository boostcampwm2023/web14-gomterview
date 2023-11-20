import { getCategory } from '@/apis/category';
import { QUERY_KEY } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

const useCategoryQuery = () => {
  return useQuery({
    queryKey: QUERY_KEY.CATEGORY,
    queryFn: getCategory,
  });
};

export default useCategoryQuery;
