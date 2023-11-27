import { PATH } from '@constants/path';
import { css } from '@emotion/react';
import { Button } from '@foundation/index';
import { theme } from '@styles/theme';

type VideoShareModalFooterProps = {
  hash?: string | null;
  closeModal: () => void;
};

const VideoShareModalFooter: React.FC<VideoShareModalFooterProps> = ({
  closeModal,
  hash,
}) => {
  const handleCopyLink = async () => {
    if (hash) {
      try {
        await navigator.clipboard.writeText(
          `https://gomterview.com${PATH.INTERVIEW_VIDEO_PUBLIC(hash)}`
        );
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
      <Button
        variants="secondary"
        onClick={() => void handleCopyLink()}
        disabled={!hash}
        css={css`
          border: 1px solid ${theme.colors.border.default};
          background-color: transparent;
        `}
      >
        링크 복사
      </Button>
      <Button onClick={closeModal}>완료</Button>
    </div>
  );
};

export default VideoShareModalFooter;
