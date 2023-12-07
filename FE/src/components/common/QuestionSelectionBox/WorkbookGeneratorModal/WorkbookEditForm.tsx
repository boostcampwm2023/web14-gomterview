import { Button, Input, InputArea } from '@foundation/index';
import { css } from '@emotion/react';
import { FormEventHandler, useCallback, useEffect, useState } from 'react';
import LabelBox from '@common/QuestionSelectionBox/WorkbookGeneratorModal/LabelBox';
import WorkbookCategory from '@common/QuestionSelectionBox/WorkbookGeneratorModal/WorkbookCategory';
import useInput from '@hooks/useInput';
import { theme } from '@styles/theme';
import useWorkbookQuery from '@hooks/apis/queries/useWorkbookQuery';
import useCategoryQuery from '@hooks/apis/queries/useCategoryQuery';
import useWorkbookEdit from '@hooks/useWorkbookEdit';
import { ShareRangeToggle } from '@common/index';
import { toast } from '@foundation/Toast/toast';

type WorkbookEditFormProps = {
  workbookId: number;
  closeModal: () => void;
};
const WorkbookEditForm: React.FC<WorkbookEditFormProps> = ({
  workbookId,
  closeModal,
}) => {
  const { data: workbookInfo, isFetching: isWorkbookFetching } =
    useWorkbookQuery({
      workbookId: workbookId,
      enabled: workbookId > 0,
    });
  const { data: categories } = useCategoryQuery();
  const [activeValidationError, setActiveValidationError] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [isPublic, setIsPublic] = useState(true);
  const {
    value: workbookTitle,
    onChange: handleWorkbookTitleChange,
    isEmpty: isWorkbookTitleEmpty,
  } = useInput<HTMLInputElement>(workbookInfo?.title ?? '');
  const { value: workbookContent, onChange: handleWorkbookContentChange } =
    useInput<HTMLTextAreaElement>(workbookInfo?.content ?? '');

  const findCategoryIndex = useCallback(
    (categoryId?: number) => {
      return (
        categories?.findIndex((category) => category.id === categoryId) ?? 0
      );
    },
    [categories]
  );

  useEffect(() => {
    if (!workbookInfo) return;

    setSelectedCategoryIndex(findCategoryIndex(workbookInfo.categoryId));
    setIsPublic(workbookInfo.isPublic);
  }, [findCategoryIndex, isWorkbookFetching, workbookInfo]);

  const { editWorkbook } = useWorkbookEdit({
    onSuccess: () => {
      closeModal();
    },
  });

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

    editWorkbook({
      workbookId: workbookId,
      title: workbookTitle,
      content: workbookContent,
      categoryId: selectedCategoryId,
      isPublic: isPublic,
    });
    toast.success('성공적으로 문제집이 수정되었습니다.');
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={closeModal}
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
          수정하기
        </Button>
      </div>
    </form>
  );
};

export default WorkbookEditForm;
