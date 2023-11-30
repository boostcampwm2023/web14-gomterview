import { useMutation } from '@tanstack/react-query';
import { deleteWorkbookById } from '@/apis/workbook';

/**
 * DELETE /workbook/${workbookId}
 *
 * workbookId에 해당하는 문제집을 삭제하기 위한 api입니다.
 */
const useWorkbookDeleteMutation = () => {
  return useMutation({
    mutationFn: deleteWorkbookById,
  });
};

export default useWorkbookDeleteMutation;
