import { Button, Input, InputArea } from '@foundation/index';
import { css } from '@emotion/react';
import { FormEventHandler, useState } from 'react';
import LabelBox from '@common/QuestionSelectionBox/InterviewSetGeneratorModal/LabelBox';
import InterviewSetCategory from '@common/QuestionSelectionBox/InterviewSetGeneratorModal/InterviewSetCategory';
import useInput from '@hooks/useInput';
import useWorkbookPostMutation from '@hooks/apis/mutations/useWorkbookPostMutation';
import { theme } from '@styles/theme';

type InterviewSetAddFormProps = {
  closeModal: () => void;
};
const InterviewSetAddForm: React.FC<InterviewSetAddFormProps> = ({
  closeModal,
}) => {
  const [activeValidationError, setActiveValidationError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const {
    value: workbookTitle,
    onChange: handleWorkbookTitleChange,
    isEmpty: isWorkbookTitleEmpty,
    clearInput: clearWorkbookTitle,
  } = useInput<HTMLInputElement>('');
  const {
    value: workbookContent,
    onChange: handleWorkbookContentChange,
    clearInput: clearWorkbookContent,
  } = useInput<HTMLTextAreaElement>('');

  const { mutate: postInterviewSet } = useWorkbookPostMutation();

  const resetState = () => {
    clearWorkbookTitle();
    clearWorkbookContent();
  };

  const handleCategoryClick = (id: number) => {
    setSelectedCategory(id);
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (isWorkbookTitleEmpty()) {
      setActiveValidationError(true);
      return;
    }

    postInterviewSet({
      title: workbookTitle,
      content: workbookContent,
      categoryId: selectedCategory,
    });
    resetState();
    closeModal();
  };

  const handleReset = () => {
    resetState();
    closeModal();
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
      `}
    >
      <LabelBox
        labelName="제목"
        labelColor={
          activeValidationError && isWorkbookTitleEmpty()
            ? theme.colors.border.error
            : theme.colors.border.default
        }
      >
        <Input
          onChange={handleWorkbookTitleChange}
          value={workbookTitle}
          css={css`
            border-color: ${activeValidationError &&
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
        <Button variants="secondary" type="reset">
          취소
        </Button>
        <Button variants="primary" type="submit">
          만들기
        </Button>
      </div>
    </form>
  );
};

export default InterviewSetAddForm;
