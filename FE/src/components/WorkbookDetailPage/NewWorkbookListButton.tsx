import { WorkbookEntity } from '@/types/workbook';
import { css } from '@emotion/react';
import { Icon, Typography } from '@foundation/index';
import useQuestionCopyMutation from '@hooks/apis/mutations/useQuestionCopyMutation';
import useWorkbookPostMutation from '@hooks/apis/mutations/useWorkbookPostMutation';
import { toast } from '@foundation/Toast/toast';

const NewWorkbookListButton = ({
  selectedQuestionIds,
  workbookData,
  onAddNewWorkbook,
}: {
  selectedQuestionIds: number[];
  workbookData: WorkbookEntity;
  onAddNewWorkbook: () => void;
}) => {
  const { mutateAsync: newWorkbookMutate } = useWorkbookPostMutation();
  const { mutateAsync: newQuestionCopyMutate } = useQuestionCopyMutation();

  const handleNewWorkbook = () => {
    try {
      void createNewWorkbook();
      onAddNewWorkbook();
      //TODO: (해민)이 다음에는 어떻게 해줄까...? (수민)일단 마이페이지로 보낼게요
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const createNewWorkbook = async () => {
    const result = await newWorkbookMutate({
      title: `${workbookData.title} 복사본`,
      content: workbookData.content,
      categoryId: workbookData.categoryId,
      isPublic: workbookData.isPublic,
    });

    await newQuestionCopyMutate({
      workbookId: result.workbookId,
      questionIds: selectedQuestionIds,
    });

    toast.success('새로운 문제집에 선택된 질문들이 추가되었습니다.');
  };

  return (
    <button
      onClick={handleNewWorkbook}
      css={css`
        display: flex;
        align-items: center;
        width: 100%;

        outline: none;
        border: none;
        background-color: transparent;
        cursor: pointer;
      `}
      type="button"
    >
      <Icon id="plus" width="1.5rem" height="1.5rem" />
      <Typography
        css={css`
          margin-left: 1rem;
        `}
      >
        새로운 면접 세트 만들기
      </Typography>
    </button>
  );
};

export default NewWorkbookListButton;
