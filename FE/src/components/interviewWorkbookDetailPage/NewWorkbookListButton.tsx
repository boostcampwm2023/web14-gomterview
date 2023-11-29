import { WorkbookEntity } from '@/types/workbook';
import { css } from '@emotion/react';
import { Icon, Typography } from '@foundation/index';
import useQuestionCopyMutation from '@hooks/apis/mutations/useQuestionCopyMutation';
import useWorkbookPostMutation from '@hooks/apis/mutations/useWorkbookPostMutation';

const NewWorkbookListButton = ({
  selectedQuestionIds,
  workbookData,
}: {
  selectedQuestionIds: number[];
  workbookData: WorkbookEntity;
}) => {
  const { mutate: newWorkbookMutate } = useWorkbookPostMutation();
  const { mutate: newQuestionCopyMutate } = useQuestionCopyMutation();

  const handleNewWorkbook = () => {
    newWorkbookMutate(
      {
        title: `${workbookData.title} 복사본`,
        content: workbookData.content,
        categoryId: workbookData.categoryId,
      },
      {
        onSuccess: (data) => {
          newQuestionCopyMutate({
            workbookId: data.workbookId,
            questionIds: selectedQuestionIds,
          });
        },
      }
    );
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
        새로운 재생 목록 만들기
      </Typography>
    </button>
  );
};

export default NewWorkbookListButton;
