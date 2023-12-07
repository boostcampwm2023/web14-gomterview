import useUserInfo from '@hooks/useUserInfo';
import { useQueryClient } from '@tanstack/react-query';
import useWorkbookDeleteMutation from '@hooks/apis/mutations/useWorkbookDeleteMutation';
import { WorkbookTitleListResDto } from '@/types/workbook';
import { QUERY_KEY } from '@constants/queryKey';

const useWorkbookDelete = () => {
  const userInfo = useUserInfo();
  const queryClient = useQueryClient();

  const { mutate: deleteWorkbookSet } = useWorkbookDeleteMutation();

  const deleteFromServer = (workbookId: number) => {
    deleteWorkbookSet(Number(workbookId));
  };

  const deleteFromState = (workbookId: number) => {
    queryClient.setQueryData<WorkbookTitleListResDto | []>(
      QUERY_KEY.WORKBOOK_TITLE,
      (prev) => prev?.filter((item) => item.workbookId !== Number(workbookId))
    );
  };

  const deleteWorkbook = (workbookId: number) => {
    userInfo ? deleteFromServer(workbookId) : deleteFromState(workbookId);
  };

  return {
    deleteWorkbook,
  };
};

export default useWorkbookDelete;
