import Modal from '../../foundation/Modal';
import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import Typography from '../../foundation/Typography/Typography';
import useQuestionAnswerQuery from '@/hooks/queries/useQuestionAnswerQuery';
import AnswerScript from './AnswerScript';
import AnswerForm from './AnswerForm';
import useAnswerDefaultMutation from '@/hooks/mutations/useAnswerDefaultMutation';
import { Question } from '@/types/question';

type AnswerSelectionModalProps = {
  isOpen: boolean;
  categoryId: number;
  closeModal: () => void;
  question: Question;
};

const AnswerSelectionModal: React.FC<AnswerSelectionModalProps> = ({
  isOpen,
  categoryId,
  closeModal,
  question,
}) => {
  const { data } = useQuestionAnswerQuery(question.questionId);

  const { mutate: selectAnswerMutate } = useAnswerDefaultMutation(categoryId, {
    onSuccess: () => {
      closeModal();
    },
  });

  if (!data) return;

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Modal.header closeButtonVisible>답변 변경하기</Modal.header>
      <Modal.content>
        <div
          css={css`
            max-width: 60rem;
          `}
        >
          <AnswerForm
            question={question.answerContent}
            questionId={question.questionId}
          />
          <div
            css={css`
              display: flex;
              gap: 1.8rem 0.5rem;
              flex-direction: column;
            `}
          >
            <Typography color={theme.colors.text.subStrong}>
              {data.length}개의 스크립트
            </Typography>
            {data.map((answer) => (
              <AnswerScript
                key={answer.answerId}
                answer={answer}
                questionId={question.questionId}
                closeModal={closeModal}
                onClick={() =>
                  selectAnswerMutate({
                    questionId: question.questionId,
                    answerId: answer.answerId,
                  })
                }
              />
            ))}
          </div>
        </div>
      </Modal.content>
    </Modal>
  );
};

export default AnswerSelectionModal;
