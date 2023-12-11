import { Question } from '@/types/question';
import QuestionAccordion from '@common/QuestionAccordion/QuestionAccordion';
import { WorkbookCard } from '@common/index';
import {
  AddWorkbookListModal,
  WorkbookDetailPageLayout,
  StartWithSelectedQuestionModal,
} from '@components/WorkbookDetailPage';
import { css } from '@emotion/react';
import { Box, Button, CheckBox } from '@foundation/index';
import useQuestionWorkbookQuery from '@hooks/apis/queries/useQuestionWorkbookQuery';
import useWorkbookQuery from '@hooks/apis/queries/useWorkbookQuery';
import useUserInfo from '@hooks/useUserInfo';
import { theme } from '@styles/theme';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { toast } from '@foundation/Toast/toast';
import useModal from '@hooks/useModal';

const WorkbookDetailPage = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<Question[]>([]);
  const [allSelected, setAllSelected] = useState<boolean>(false);

  const { workbookId } = useLoaderData() as { workbookId: number };
  const userInfo = useUserInfo();
  const { data: questionWorkbookData } = useQuestionWorkbookQuery({
    workbookId,
  });
  const { data: workbookData } = useWorkbookQuery({ workbookId: workbookId });

  const {
    openModal: openStartWithSelectedQuestionModal,
    closeModal: closeStartWithSelectedQuestionModal,
  } = useModal(
    () =>
      workbookData && (
        <StartWithSelectedQuestionModal
          closeModal={closeStartWithSelectedQuestionModal}
          workbookData={workbookData}
          questions={selectedQuestion}
        />
      )
  );

  const {
    openModal: openAddWorkbookListModal,
    closeModal: closeAddWorkbookListModal,
  } = useModal(
    () =>
      workbookData && (
        <AddWorkbookListModal
          closeModal={closeAddWorkbookListModal}
          selectedQuestionIds={selectedQuestion.map(
            (question) => question.questionId
          )}
          workbookData={workbookData}
        />
      )
  );

  const selectQuestion = (question: Question) => {
    setSelectedQuestion((prev) =>
      prev.filter((prev) => prev.questionId !== question.questionId)
    );
  };

  const unSelectQuestion = (question: Question) => {
    setSelectedQuestion((prev) => [...prev, question]);
  };

  const allSelectQuestion = () => {
    setSelectedQuestion(
      questionWorkbookData?.map((question) => question) || []
    );
    toast.success('모든 질문이 선택 되었습니다.');
  };

  const allUnSelectQuestion = () => setSelectedQuestion([]);

  const handleAllSelected = () => {
    allSelected ? allUnSelectQuestion() : allSelectQuestion();
    setAllSelected((prev) => !prev);
  };

  const validateAddWorkbookListModal = () => {
    if (!userInfo) {
      toast.warning('로그인이 필요합니다.');
      return false;
    }
    if (selectedQuestion.length < 1) {
      toast.warning('질문을 선택해주세요');
      return false;
    }
    return true;
  };

  if (!workbookData) return;

  return (
    <>
      <WorkbookDetailPageLayout>
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
          <div
            css={css`
              display: flex;
              gap: 0.3125rem;
            `}
          >
            <Button
              variants="secondary"
              onClick={openStartWithSelectedQuestionModal}
            >
              인터뷰 시작하기
            </Button>
            <Button
              onClick={() => {
                validateAddWorkbookListModal() && openAddWorkbookListModal();
              }}
            >
              질문 가져오기
            </Button>
          </div>
        </div>

        <Box
          css={css`
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
            background-color: ${theme.colors.border.weak};
            height: auto;
          `}
        >
          {questionWorkbookData?.map((question) => {
            const isSelected = selectedQuestion.includes(question);
            return (
              <QuestionAccordion
                question={question}
                workbookId={workbookId}
                isSelected={isSelected}
                isEditable={false}
                toggleSelected={() =>
                  isSelected
                    ? selectQuestion(question)
                    : unSelectQuestion(question)
                }
                key={question.questionId}
              />
            );
          })}
        </Box>
      </WorkbookDetailPageLayout>
    </>
  );
};

export default WorkbookDetailPage;
