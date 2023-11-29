import { Avatar, Input, InputArea, Typography } from '@foundation/index';
import { css } from '@emotion/react';
import { useCallback, useEffect, useState } from 'react';
import LabelBox from '@common/QuestionSelectionBox/InterviewSetEditModal/LabelBox';
import InterviewSetCategory from '@common/QuestionSelectionBox/InterviewSetEditModal/InterviewSetCategory';
import useUserInfo from '@hooks/useUserInfo';
import useWorkbookQuery from '@hooks/apis/queries/useWorkbookQuery';
import useWorkbookPatchMutation from '@hooks/apis/mutations/useWorkbookPatchMutation';
import useInput from '@hooks/useInput';
import useDebounce from '@hooks/useDebounce';

type InterviewSetFormProps = {
  workbookId: number;
};
const InterviewSetForm: React.FC<InterviewSetFormProps> = ({ workbookId }) => {
  const userInfo = useUserInfo();
  const { data: workbookInfo } = useWorkbookQuery(workbookId);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const { value: workbookTitle, onChange: handleWorkbookTitleChange } =
    useInput<HTMLInputElement>(workbookInfo?.title ?? '');
  const { value: workbookContent, onChange: handleWorkbookContentChange } =
    useInput<HTMLTextAreaElement>(workbookInfo?.title ?? '');

  //TODO 오른쪽 위에서 각 상태에 따라 UI 표시해주는것 구현해야함
  const { mutate } = useWorkbookPatchMutation({
    onMutate: () => {
      console.log('저장중');
    },
    onError: () => {
      console.log('에러 발생');
    },
    onSuccess: () => {
      console.log('성공');
    },
  });
  const debouncedMutate = useDebounce(mutate, 1000);

  const runDebouncedMutation = useCallback(() => {
    debouncedMutate({
      workbookId,
      body: {
        workbookId: workbookId,
        title: workbookTitle,
        content: workbookContent,
        categoryId: selectedCategory,
      },
    });
  }, [
    debouncedMutate,
    selectedCategory,
    workbookContent,
    workbookId,
    workbookTitle,
  ]);

  useEffect(() => {
    runDebouncedMutation();
    return () => {
      runDebouncedMutation();
    };
  }, [runDebouncedMutation]);

  //TODO 추후 Suspense와 스켈레톤 UI 도입 예정
  if (!workbookInfo) return '로딩중';

  //TODO 유저 정보가 없다면 이 페이지 진입 못하도록 로더에서 처리해야함
  if (!userInfo) return null;

  const handleCategoryClick = (id: number) => {
    setSelectedCategory(id);
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
        padding: 1rem;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          column-gap: 0.5rem;
          padding-left: 0.25rem;
        `}
      >
        <Avatar width="1.5rem" height="1.5rem" src={userInfo.profileImg} />
        <Typography variant="body3">{userInfo.nickname}</Typography>
      </div>
      <LabelBox labelName="제목">
        <Input onChange={handleWorkbookTitleChange} value={workbookTitle} />
      </LabelBox>
      <LabelBox labelName="카테고리">
        <InterviewSetCategory
          selectedId={selectedCategory || workbookInfo.categoryId}
          onClick={handleCategoryClick}
        />
      </LabelBox>
      <LabelBox labelName="설명">
        <InputArea
          onChange={handleWorkbookContentChange}
          value={workbookContent}
        />
      </LabelBox>
    </div>
  );
};

export default InterviewSetForm;
