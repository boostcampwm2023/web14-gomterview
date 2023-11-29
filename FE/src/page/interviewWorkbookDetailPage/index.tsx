import QuestionAccordion from '@common/QuestionAccordion/QuestionAccordion';
import { WorkbookCard } from '@common/index';
import { InterviewWorkbookDetailPageLayout } from '@components/interviewWorkbookDetailPage';
import { css } from '@emotion/react';
import { Box, Button, CheckBox } from '@foundation/index';
import useQuestionWorkbookQuery from '@hooks/apis/queries/useQuestionWorkbookQuery';
import useWorkbookQuery from '@hooks/apis/queries/useWorkbookQuery';
import { theme } from '@styles/theme';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const InterviewWorkbookDetailPage = () => {
  const [selectedQuestionId, setSelectedQuestionId] = useState<number[]>([]);
  const [allSelected, setAllSelected] = useState<boolean>(false);

  const { workbookId } = useLoaderData() as { workbookId: number };
  const { data: questionWorkbookData } = useQuestionWorkbookQuery(workbookId);
  const { data: workbookData } = useWorkbookQuery(workbookId);

  const toggleSelectedQuestionId = (questionId: number) => {
    if (selectedQuestionId.includes(questionId)) {
      setSelectedQuestionId((prev) => prev.filter((id) => id !== questionId));
    } else {
      setSelectedQuestionId((prev) => [...prev, questionId]);
    }
  };

  const handleAllSelected = () => {
    if (allSelected) {
      setSelectedQuestionId([]);
    } else {
      setSelectedQuestionId(
        questionWorkbookData?.map((question) => question.questionId) || []
      );
    }
    setAllSelected((prev) => !prev);
  };

  if (!workbookData) return;

  return (
    <InterviewWorkbookDetailPageLayout>
      <WorkbookCard
        css={css`
          height: auto;
        `}
        nickname={workbookData.nickname}
        profileImg={workbookData.profileImg}
        copyCount={workbookData.copyCount}
        title={workbookData.title}
        content={workbookData.content}
      />

      <div
        css={css`
          display: flex;
          justify-content: space-between;
          padding: 1rem;
        `}
      >
        <CheckBox
          id="allSelect"
          checked={allSelected}
          onInputChange={handleAllSelected}
        >
          전체 선택하기
        </CheckBox>
        <Button>질문 가져오기</Button>
      </div>

      <Box
        css={css`
          padding: 1rem;
          background-color: ${theme.colors.border.weak};
          height: auto;
        `}
      >
        {questionWorkbookData?.map((question) => (
          <QuestionAccordion
            question={question}
            workbookId={workbookId}
            isSelected={selectedQuestionId.includes(question.questionId)}
            toggleSelected={() => toggleSelectedQuestionId(question.questionId)}
            key={question.questionId}
          />
        ))}
      </Box>
    </InterviewWorkbookDetailPageLayout>
  );
};

export default InterviewWorkbookDetailPage;
