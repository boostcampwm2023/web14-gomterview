import useUserInfo from '@hooks/useUserInfo';
import {
  WorkbookPatchReqDto,
  WorkbookResDto,
  WorkbookTitleListResDto,
} from '@/types/workbook';
import { QUERY_KEY } from '@constants/queryKey';
import { useQueryClient } from '@tanstack/react-query';
import useWorkbookPatchMutation from '@hooks/apis/mutations/useWorkbookPatchMutation';

type useWorkbookEditProps = {
  onSuccess?: () => void;
};
const useWorkbookEdit = ({ onSuccess }: useWorkbookEditProps) => {
  const userInfo = useUserInfo();
  const queryClient = useQueryClient();

  const { mutate: patchInterviewSet } = useWorkbookPatchMutation();

  const editWorkbookToServer = (workbook: WorkbookPatchReqDto) => {
    patchInterviewSet(workbook);
  };

  const editWorkbookToState = (workbook: WorkbookPatchReqDto) => {
    queryClient.setQueryData<WorkbookTitleListResDto | []>(
      QUERY_KEY.WORKBOOK_TITLE,
      (prev) =>
        prev?.map((item) =>
          item.workbookId === workbook.workbookId
            ? { ...item, title: workbook.title }
            : item
        ) ?? []
    );

    queryClient.setQueryData<WorkbookResDto>(
      QUERY_KEY.WORKBOOK_ID(workbook.workbookId),
      (prev) =>
        prev && {
          ...prev,
          categoryId: workbook.categoryId,
          title: workbook.title,
          content: workbook.content,
        }
    );
  };

  const editWorkbook = (workbook: WorkbookPatchReqDto) => {
    userInfo ? editWorkbookToServer(workbook) : editWorkbookToState(workbook);
    onSuccess?.();
  };

  return { editWorkbook };
};

export default useWorkbookEdit;
