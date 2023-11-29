import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { patchWorkbookById } from '@/apis/workbook';
import { WorkbookPatchReqDto } from '@/types/workbook';

/**
 * PATCH /workbook/${workbookId}
 *
 * workbookId에 해당하는 문제집의 메타정보(title, category, content)를 수정하기 위한 api입니다.
 */
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
