import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import { getWorkbookByCategory } from '@/apis/workbook';

const useWorkbookListQuery = (categoryId: number) => {
  return useQuery({
    queryKey: QUERY_KEY.WORKBOOK,
    queryFn: () => getWorkbookByCategory(categoryId),
  });
};

export default useWorkbookListQuery;
