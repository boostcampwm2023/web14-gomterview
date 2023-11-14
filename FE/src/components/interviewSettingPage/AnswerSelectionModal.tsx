import Modal from '../foundation/Modal';
import Button from '../foundation/Button/Button';
import Box from '../foundation/Box/Box';
import InputArea from '../foundation/InputArea/InputArea';
import { css } from '@emotion/react';
import Avatar from '../foundation/Avatar/Avatar';
import { theme } from '@/styles/theme';
import Typography from '../foundation/Typography/Typography';

type AnswerScriptProps = {
  name: string;
  content: string;
};

const AnswerScript: React.FC<AnswerScriptProps> = ({ name, content }) => {
  return (
    <Box>
      <div
        css={css`
          display: flex;
          gap: 0.5rem;
          align-items: center;
          padding: 0.6rem;
          background-color: ${theme.colors.point.secondary.default};
          color: ${theme.colors.text.white};
          border-radius: 1rem 1rem 0 0;
        `}
      >
        <Avatar width="1.5rem" height="1.5rem" />
        <span
          css={css`
            display: inline-block;
          `}
        >
          {name}
        </span>
      </div>
      <p
        css={css`
          padding: 0.7rem;
        `}
      >
        {content}
      </p>
    </Box>
  );
};

type AnswerSelectionModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

const AnswerSelectionModal: React.FC<AnswerSelectionModalProps> = ({
  isOpen,
  closeModal,
}) => {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Modal.header closeButtonVisible>답변 변경하기</Modal.header>
      <Modal.content>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            margin-bottom: 1.5rem;
            max-width: 60rem;
          `}
        >
          <Box
            css={css`
              padding: 1rem;
              margin-bottom: 1.5rem;
            `}
          >
            <Typography>대충 질문지 내용</Typography>
          </Box>
          <InputArea />
          <Button
            size="sm"
            css={css`
              margin-top: 1rem;
              margin-left: auto;
            `}
          >
            답변 추가하기
          </Button>
        </div>
        <div
          css={css`
            display: flex;
            gap: 0.5rem;
            flex-direction: column;
          `}
        >
          <Typography color={theme.colors.text.subStrong}>
            10개의 스크립트
          </Typography>
          <AnswerScript name={'이성인'} content="asdasdasdas" />
        </div>
      </Modal.content>
    </Modal>
  );
};

export default AnswerSelectionModal;
