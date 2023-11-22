import Button from '@foundation/Button/Button';
import { theme } from '@styles/theme';
import { css } from '@emotion/react';
import LightButton from '@common/LightButton/LightButton';

type VideoShareModalFooterProps = {
  hashUrl?: string | null;
  closeModal: () => void;
};

const VideoShareModalFooter: React.FC<VideoShareModalFooterProps> = ({
  hashUrl,
  closeModal,
}) => {
  const handleCopyLink = async () => {
    if (hashUrl) {
      try {
        await navigator.clipboard.writeText(hashUrl);
        alert('링크 복사됨'); //TODO 현재는 alert이지만 추후에 Toast로 변경 예정
      } catch (e) {
        alert('복사 실패');
      }
    }
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
        onClick={() => void handleCopyLink()}
        disabled={!hashUrl}
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
