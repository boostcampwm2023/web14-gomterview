import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import { getWorkbookById } from '@/apis/workbook';

const useWorkbookQuery = (workbookId: number) => {
  return useQuery({
    queryKey: QUERY_KEY.WORKBOOK_ID(workbookId),
    queryFn: () => getWorkbookById(workbookId),
  });
};

export default useWorkbookQuery;
