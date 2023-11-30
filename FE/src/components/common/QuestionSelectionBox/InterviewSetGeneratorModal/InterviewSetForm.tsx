import { Button, Input, InputArea } from '@foundation/index';
import { css } from '@emotion/react';
import { FormEventHandler, useState } from 'react';
import LabelBox from '@common/QuestionSelectionBox/InterviewSetGeneratorModal/LabelBox';
import InterviewSetCategory from '@common/QuestionSelectionBox/InterviewSetGeneratorModal/InterviewSetCategory';
import useWorkbookPatchMutation from '@hooks/apis/mutations/useWorkbookPatchMutation';
import useInput from '@hooks/useInput';
import useWorkbookPostMutation from '@hooks/apis/mutations/useWorkbookPostMutation';
import { WorkbookEntity } from '@/types/workbook';
import { theme } from '@styles/theme';

type InterviewSetFormProps = {
  workbookInfo?: WorkbookEntity;
  closeModal: () => void;
};
const InterviewSetForm: React.FC<InterviewSetFormProps> = ({
  workbookInfo,
  closeModal,
}) => {
  //TODO 비회원일때는 로컬에 새 문제집 추가하고, 나만의 질문 추가할 수 있도록 할까??
  const [activeVaildationError, setActiveVaildationError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number>(
    workbookInfo?.categoryId ?? 1
  );
  const {
    value: workbookTitle,
    onChange: handleWorkbookTitleChange,
    isEmpty: isWorkbookTitleEmpty,
  } = useInput<HTMLInputElement>(workbookInfo?.title ?? '');
  const { value: workbookContent, onChange: handleWorkbookContentChange } =
    useInput<HTMLTextAreaElement>(workbookInfo?.title ?? '');

  const { mutate: patchInterviewSet } = useWorkbookPatchMutation();
  const { mutate: postInterviewSet } = useWorkbookPostMutation();

  const makeRequestBody = () => ({
    title: workbookTitle,
    content: workbookContent,
    categoryId: selectedCategory,
  });

  const handleCategoryClick = (id: number) => {
    setSelectedCategory(id);
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (isWorkbookTitleEmpty()) {
      setActiveVaildationError(true);
      return;
    }

    workbookInfo?.workbookId
      ? patchInterviewSet({
          workbookId: workbookInfo.workbookId,
          body: { workbookId: workbookInfo.workbookId, ...makeRequestBody() },
        })
      : postInterviewSet(makeRequestBody());

    closeModal();
  };

  return (
    <form
      onSubmit={handleSubmit}
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
      `}
    >
      <LabelBox
        labelName="제목"
        labelColor={
          activeVaildationError && isWorkbookTitleEmpty()
            ? theme.colors.border.error
            : theme.colors.border.default
        }
      >
        <Input
          onChange={handleWorkbookTitleChange}
          value={workbookTitle}
          css={css`
            border-color: ${activeVaildationError &&
            isWorkbookTitleEmpty() &&
            theme.colors.border.error};
          `}
        />
      </LabelBox>
      <LabelBox labelName="카테고리">
        <InterviewSetCategory
          selectedId={selectedCategory}
          onClick={handleCategoryClick}
        />
      </LabelBox>
      <LabelBox labelName="설명">
        <InputArea
          onChange={handleWorkbookContentChange}
          value={workbookContent}
        />
      </LabelBox>
      <div
        css={css`
          display: flex;
          justify-content: flex-end;
          column-gap: 0.5rem;
          margin-top: 1rem;
        `}
      >
        <Button variants="secondary" type="submit">
          취소
        </Button>
        <Button variants="primary">만들기</Button>
      </div>
    </form>
  );
};

export default InterviewSetForm;
