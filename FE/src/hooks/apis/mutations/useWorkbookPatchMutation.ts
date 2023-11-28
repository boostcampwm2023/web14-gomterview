import { useMutation } from '@tanstack/react-query';
import { patchWorkbookById } from '@/apis/workbook';

const useWorkbookPatchMutation = () => {
  return useMutation({
    mutationFn: patchWorkbookById,
  });
};

export default useWorkbookPatchMutation;
