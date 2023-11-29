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
  const { mutateAsync: newWorkbookMutate } = useWorkbookPostMutation();
  const { mutateAsync: newQuestionCopyMutate } = useQuestionCopyMutation();

  const handleNewWorkbook = () => {
    try {
      void createNewWorkbook();
      //TODO: 이 다음에는 어떻게 해줄까...?
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
    });

    await newQuestionCopyMutate({
      workbookId: result.workbookId,
      questionIds: selectedQuestionIds,
    });
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
