import { Modal } from '@foundation/index';
import { css } from '@emotion/react';
import InterviewSetForm from '@common/QuestionSelectionBox/InterviewSetGeneratorModal/InterviewSetForm';
import useWorkbookQuery from '@hooks/apis/queries/useWorkbookQuery';

type InterviewSetGeneratorModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  workbookId?: number;
};
const InterviewSetGeneratorModal: React.FC<InterviewSetGeneratorModalProps> = ({
  isOpen,
  closeModal,
  workbookId,
}) => {
  //TODO 타입추론 관련 문제 해결하기
  const { data: workbookInfo } = useWorkbookQuery({
    workbookId: workbookId ?? 1,
    enabled: !!workbookId, //추가, 수정을 구분하기 위해 workbookId가 있을 때만 쿼리 요청
  });
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Modal.header>새 면접 세트</Modal.header>
      <div
        css={css`
          min-width: 40vw;
          max-width: 40rem;
          width: 100%;
          max-height: 80vh;
          padding: 1.5rem;
        `}
      >
        <InterviewSetForm workbookInfo={workbookInfo} closeModal={closeModal} />
      </div>
    </Modal>
  );
};

export default InterviewSetGeneratorModal;
