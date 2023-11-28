import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import { getWorkbookTitle } from '@/apis/workbook';

const useWorkbookTitleListQuery = () => {
  return useQuery({
    queryKey: QUERY_KEY.WORKBOOK,
    queryFn: () => getWorkbookTitle(),
  });
};

export default useWorkbookTitleListQuery;
