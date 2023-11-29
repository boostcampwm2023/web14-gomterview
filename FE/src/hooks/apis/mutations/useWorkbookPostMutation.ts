import { useMutation } from '@tanstack/react-query';
import { postWorkbook } from '@/apis/workbook';

/**
 * POST /workbook
 *
 * 새로운 문제집을 추가하기 위한 api입니다.
 */
const useWorkbookPostMutation = () => {
  return useMutation({
    mutationFn: postWorkbook,
  });
};

export default useWorkbookPostMutation;
