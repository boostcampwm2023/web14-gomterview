import { Button, Input, InputArea } from '@foundation/index';
import { css } from '@emotion/react';
import { FormEventHandler, useState } from 'react';
import LabelBox from '@common/QuestionSelectionBox/InterviewSetGeneratorModal/LabelBox';
import InterviewSetCategory from '@common/QuestionSelectionBox/InterviewSetGeneratorModal/InterviewSetCategory';
import useInput from '@hooks/useInput';
import { theme } from '@styles/theme';
import useWorkbookQuery from '@hooks/apis/queries/useWorkbookQuery';
import useWorkbookPatchMutation from '@hooks/apis/mutations/useWorkbookPatchMutation';
import useCategoryQuery from '@hooks/apis/queries/useCategoryQuery';

type InterviewSetFormProps = {
  workbookId: number;
  closeModal: () => void;
};
const InterviewSetEditForm: React.FC<InterviewSetFormProps> = ({
  workbookId,
  closeModal,
}) => {
  const { data: workbookInfo } = useWorkbookQuery({
    workbookId: workbookId,
  });
  const { data: categories } = useCategoryQuery();
  const [activeVaildationError, setActiveVaildationError] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const {
    value: workbookTitle,
    onChange: handleWorkbookTitleChange,
    isEmpty: isWorkbookTitleEmpty,
    clearInput: clearWorkbookTitle,
  } = useInput<HTMLInputElement>(workbookInfo?.title ?? '');
  const {
    value: workbookContent,
    onChange: handleWorkbookContentChange,
    clearInput: clearWorkbookContent,
  } = useInput<HTMLTextAreaElement>(workbookInfo?.title ?? '');

  const { mutate: patchInterviewSet } = useWorkbookPatchMutation();

  const findSelectedCategoryId = () => {
    return categories?.find((_, index) => index === selectedCategoryIndex)?.id;
  };

  const handleCategoryClick = (index: number) => {
    setSelectedCategoryIndex(index);
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    const selectedCategoryId = findSelectedCategoryId();
    if (isWorkbookTitleEmpty() || !selectedCategoryId) {
      setActiveVaildationError(true);
      return;
    }

    console.log(selectedCategoryId);

    patchInterviewSet({
      workbookId: workbookId,
      body: {
        workbookId: workbookId,
        title: workbookTitle,
        content: workbookContent,
        categoryId: selectedCategoryId,
      },
    });
    closeModal();
  };

  const handleReset = () => {
    clearWorkbookTitle();
    clearWorkbookContent();
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
          categories={categories}
          selectedCategoryIndex={selectedCategoryIndex}
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

export default InterviewSetEditForm;