import { css } from '@emotion/react';
import { theme } from '@styles/theme';
import QuestionAccordion from '@common/QuestionAccordion/QuestionAccordion';
import AnswerSelectionModal from '@common/QuestionSelectionBox/AnswerSelectionModal/AnswerSelectionModal';
import { QuestionAnswerSelectionModal } from '@atoms/modal';
import { useRecoilState } from 'recoil';
import QuestionAddForm from '@common/QuestionSelectionBox/QuestionAddForm';
import useQuestionWorkbookQuery from '@hooks/apis/queries/useQuestionWorkbookQuery';

type InterviewSetQuestionListProps = {
  workbookId: number;
};
const InterviewSetQuestionList: React.FC<InterviewSetQuestionListProps> = ({
  workbookId,
}) => {
  const { data: workbookQuestionList } = useQuestionWorkbookQuery({
    workbookId,
    enabled: true,
  });
  const [{ isOpen, question: selectedQuestion }, setModalState] =
    useRecoilState(QuestionAnswerSelectionModal);

  if (!workbookQuestionList) return null;

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
        padding: 1rem;
        border-radius: 1rem;
        background-color: ${theme.colors.surface.inner};
      `}
    >
      <QuestionAddForm workbookId={workbookId} />
      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <AnswerSelectionModal
          isOpen={isOpen}
          workbookId={workbookId}
          question={selectedQuestion ?? workbookQuestionList[0]}
          closeModal={() =>
            setModalState((pre) => ({
              ...pre,
              isOpen: false,
            }))
          }
        />
        {workbookQuestionList?.map((question) => (
          <QuestionAccordion
            key={question?.questionId}
            question={question}
            workbookId={workbookId}
            isSelected={true}
          />
        ))}
      </div>
    </div>
  );
};

export default InterviewSetQuestionList;
