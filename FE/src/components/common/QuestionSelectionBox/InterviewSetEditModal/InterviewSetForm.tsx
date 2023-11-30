import { Button, Input, InputArea } from '@foundation/index';
import { css } from '@emotion/react';
import { useState } from 'react';
import LabelBox from '@common/QuestionSelectionBox/InterviewSetEditModal/LabelBox';
import InterviewSetCategory from '@common/QuestionSelectionBox/InterviewSetEditModal/InterviewSetCategory';
import useUserInfo from '@hooks/useUserInfo';
import useWorkbookQuery from '@hooks/apis/queries/useWorkbookQuery';
import useWorkbookPatchMutation from '@hooks/apis/mutations/useWorkbookPatchMutation';
import useInput from '@hooks/useInput';

type InterviewSetFormProps = {
  workbookId: number;
  closeModal: () => void;
};
const InterviewSetForm: React.FC<InterviewSetFormProps> = ({
  workbookId,
  closeModal,
}) => {
  const userInfo = useUserInfo();
  const { data: workbookInfo } = useWorkbookQuery({
    workbookId: workbookId ?? 1,
    enabled: !!workbookId, //추가, 수정을 구분하기 위해 workbookId가 있을 때만 쿼리 요청
  });
  const [selectedCategory, setSelectedCategory] = useState(1);
  const { value: workbookTitle, onChange: handleWorkbookTitleChange } =
    useInput<HTMLInputElement>(workbookInfo?.title ?? '');
  const { value: workbookContent, onChange: handleWorkbookContentChange } =
    useInput<HTMLTextAreaElement>(workbookInfo?.title ?? '');

  const { mutate } = useWorkbookPatchMutation();

  const handleCategoryClick = (id: number) => {
    setSelectedCategory(id);
  };

  return (
    <form
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
      `}
    >
      <LabelBox labelName="제목">
        <Input onChange={handleWorkbookTitleChange} value={workbookTitle} />
      </LabelBox>
      <LabelBox labelName="카테고리">
        <InterviewSetCategory
          selectedId={selectedCategory || workbookInfo!.categoryId}
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
