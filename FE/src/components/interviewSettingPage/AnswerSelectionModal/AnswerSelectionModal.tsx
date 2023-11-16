import Modal from '../../foundation/Modal';
import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import Typography from '../../foundation/Typography/Typography';
import useQuestionAnswerQuery from '@/hooks/queries/useQuestionAnswerQuery';
import AnswerScript from './AnswerScript';
import AnswerForm from './AnswerForm';

type AnswerSelectionModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  questionId: number;
  question: string;
};

const AnswerSelectionModal: React.FC<AnswerSelectionModalProps> = ({
  isOpen,
  closeModal,
  questionId,
  question,
}) => {
  const { data } = useQuestionAnswerQuery(questionId);

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
          <AnswerForm question={question} questionId={questionId} />
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
                name={answer.memberName}
                content={answer.content}
                userImg={answer.memberImage}
              />
            ))}
          </div>
        </div>
      </Modal.content>
    </Modal>
  );
};

export default AnswerSelectionModal;
