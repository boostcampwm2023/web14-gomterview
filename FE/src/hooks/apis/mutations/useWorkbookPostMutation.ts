import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postWorkbook } from '@/apis/workbook';
import { QUERY_KEY } from '@constants/queryKey';

/**
 * POST /workbook
 *
 * 새로운 문제집을 추가하기 위한 api입니다.
 */
const useWorkbookPostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postWorkbook,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.WORKBOOK_TITLE,
      });
    },
  });
};

export default useWorkbookPostMutation;
