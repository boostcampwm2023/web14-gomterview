import { Button, Input, InputArea } from '@foundation/index';
import { css } from '@emotion/react';
import { FormEventHandler, useState } from 'react';
import LabelBox from '@common/QuestionSelectionBox/WorkbookGeneratorModal/LabelBox';
import WorkbookCategory from '@common/QuestionSelectionBox/WorkbookGeneratorModal/WorkbookCategory';
import useInput from '@hooks/useInput';
import { theme } from '@styles/theme';
import useCategoryQuery from '@hooks/apis/queries/useCategoryQuery';
import useWorkbookAdd from '@hooks/useWorkbookAdd';
import { ShareRangeToggle } from '@common/index';
import { toast } from '@foundation/Toast/toast';
type WorkbookAddFormProps = {
  closeModal: () => void;
};
const WorkbookAddForm: React.FC<WorkbookAddFormProps> = ({ closeModal }) => {
  const { data: categories } = useCategoryQuery();
  const [activeValidationError, setActiveValidationError] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [isPublic, setIsPublic] = useState(true);
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

  const { addWorkbook } = useWorkbookAdd({
    onSuccess: () => {
      handleReset();
    },
  });

  const resetState = () => {
    clearWorkbookTitle();
    clearWorkbookContent();
  };

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
      setActiveValidationError(true);
      return;
    }

    addWorkbook({
      title: workbookTitle,
      content: workbookContent,
      categoryId: selectedCategoryId,
      isPublic: isPublic,
    });

    toast.success('성공적으로 문제집이 추가되었습니다.');

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
        <WorkbookCategory
          categories={categories}
          selectedCategoryIndex={selectedCategoryIndex}
          onClick={handleCategoryClick}
        />
      </LabelBox>
      <LabelBox labelName="공개 범위">
        <ShareRangeToggle
          isPublic={isPublic}
          onClick={() => setIsPublic((prev) => !prev)}
          publicText={{
            text: '곰터뷰의 모든 사용자',
            description: '비회원을 포함한 곰터뷰의 모든 사용자에게 공개됩니다.',
          }}
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

export default WorkbookAddForm;
