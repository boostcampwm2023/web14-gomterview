import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { patchWorkbookById } from '@/apis/workbook';
import { WorkbookPatchReqDto } from '@/types/workbook';

const useWorkbookPatchMutation = (
  options?: UseMutationOptions<
    null,
    Error,
    { body: WorkbookPatchReqDto; workbookId: number }
  >
) => {
  return useMutation({
    mutationFn: patchWorkbookById,
    ...options,
  });
};

export default useWorkbookPatchMutation;
