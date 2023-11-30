import QuestionAccordion from '@common/QuestionAccordion/QuestionAccordion';
import { WorkbookCard } from '@common/index';
import {
  AddWorkbookListModal,
  InterviewWorkbookDetailPageLayout,
} from '@components/interviewWorkbookDetailPage';
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { workbookId } = useLoaderData() as { workbookId: number };
  const { data: questionWorkbookData } = useQuestionWorkbookQuery({
    workbookId,
  });
  const { data: workbookData } = useWorkbookQuery(workbookId);

  const selectQuestion = (questionId: number) =>
    setSelectedQuestionId((prev) => prev.filter((id) => id !== questionId));

  const unSelectQuestion = (questionId: number) =>
    setSelectedQuestionId((prev) => [...prev, questionId]);

  const allSelectQuestion = () =>
    setSelectedQuestionId(
      questionWorkbookData?.map((question) => question.questionId) || []
    );

  const allUnSelectQuestion = () => setSelectedQuestionId([]);

  const handleAllSelected = () => {
    allSelected ? allUnSelectQuestion() : allSelectQuestion();
    setAllSelected((prev) => !prev);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    selectedQuestionId.length < 1
      ? alert('질문을 선택해주세요')
      : setIsModalOpen(true);
  };

  if (!workbookData) return;

  return (
    <>
      <AddWorkbookListModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        selectedQuestionIds={selectedQuestionId}
        workbookData={workbookData}
      />
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
            align-items: center;
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
          <Button onClick={openModal}>질문 가져오기</Button>
        </div>

        <Box
          css={css`
            padding: 1rem;
            background-color: ${theme.colors.border.weak};
            height: auto;
          `}
        >
          {questionWorkbookData?.map((question) => {
            const isSelected = selectedQuestionId.includes(question.questionId);
            return (
              <QuestionAccordion
                question={question}
                workbookId={workbookId}
                isSelected={isSelected}
                isEditable={false}
                toggleSelected={() =>
                  isSelected
                    ? selectQuestion(question.questionId)
                    : unSelectQuestion(question.questionId)
                }
                key={question.questionId}
              />
            );
          })}
        </Box>
      </InterviewWorkbookDetailPageLayout>
    </>
  );
};

export default InterviewWorkbookDetailPage;
