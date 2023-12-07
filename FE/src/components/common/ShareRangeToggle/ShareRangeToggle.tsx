import { css } from '@emotion/react';
import Toggle from '@foundation/Toggle/Toggle';
import { Typography } from '@foundation/index';
import { theme } from '@styles/theme';
import ShareRangeIcon from '../../interviewVideoPage/ShareRangeModal/ShareRangeIcon';

type ShareRangeToggleProps = {
  isPublic: boolean;
  onClick: () => void;
  publicText?: {
    text: string;
    description: string;
  };
  privateText?: {
    text: string;
    description: string;
  };
};
const ShareRangeToggle: React.FC<ShareRangeToggleProps> = ({
  isPublic,
  onClick,
  publicText = {
    text: '링크가 있는 모든 사용자',
    description: '링크가 있는 인터넷상의 모든 사용자가 볼 수 있습니다.',
  },
  privateText = {
    text: '비공개',
    description: '나만 볼 수 있습니다.',
  },
}) => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
      `}
    >
      <div
        css={css`
          display: flex;
          column-gap: 0.5rem;
        `}
      >
        <ShareRangeIcon isPublic={isPublic} />
        <div
          css={css`
            display: flex;
            flex-direction: column;
          `}
        >
          <Typography variant="body3">
            {isPublic ? publicText.text : privateText.text}
          </Typography>
          <Typography variant="captionWeak" color={theme.colors.text.subStrong}>
            {isPublic ? publicText.description : privateText.description}
          </Typography>
        </div>
      </div>
      <Toggle isToggled={isPublic} onClick={onClick} />
    </div>
  );
};

export default ShareRangeToggle;
