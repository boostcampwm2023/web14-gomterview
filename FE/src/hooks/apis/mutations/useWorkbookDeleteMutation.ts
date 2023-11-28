import { useMutation } from '@tanstack/react-query';
import { deleteWorkbookById } from '@/apis/workbook';

const useWorkbookDeleteMutation = () => {
  return useMutation({
    mutationFn: deleteWorkbookById,
  });
};

export default useWorkbookDeleteMutation;
