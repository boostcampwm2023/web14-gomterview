import { useMutation } from '@tanstack/react-query';
import { postWorkbook } from '@/apis/workbook';

const useWorkbookPostMutation = () => {
  return useMutation({
    mutationFn: postWorkbook,
  });
};

export default useWorkbookPostMutation;
