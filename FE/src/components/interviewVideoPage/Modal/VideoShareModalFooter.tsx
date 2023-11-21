import Button from '@foundation/Button/Button';
import { theme } from '@styles/theme';
import { css } from '@emotion/react';
import LightButton from '@common/LightButton/LightButton';

type VideoShareModalFooterProps = {
  closeModal: () => void;
};

const VideoShareModalFooter: React.FC<VideoShareModalFooterProps> = ({
  closeModal,
}) => {
  const handleCopyLink = () => {
    console.log('클립보드에 복사');
  };

  return (
    <div
      css={css`
        display: flex;
        justify-content: flex-end;
        column-gap: 0.5rem;
      `}
    >
      <LightButton
        onClick={() => handleCopyLink}
        css={css`
          border: 1px solid ${theme.colors.border.default};
          background-color: transparent;
        `}
      >
        링크 복사
      </LightButton>
      <Button onClick={closeModal}>완료</Button>
    </div>
  );
};

export default VideoShareModalFooter;
