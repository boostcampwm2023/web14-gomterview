import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import { getWorkbookById } from '@/apis/workbook';

/**
 * GET /workbook/${workbookId}
 *
 * workbookId로 문제집을 단건 조회하는 api입니다.
 *
 * 문제집 상세보기, 문제집 수정 페이지 등에서 사용됩니다.
 */
const useWorkbookQuery = ({
  workbookId,
  enabled,
}: {
  workbookId: number;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: QUERY_KEY.WORKBOOK_ID(workbookId),
    queryFn: () => getWorkbookById(workbookId),
    enabled,
  });
};

export default useWorkbookQuery;
