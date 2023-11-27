import { css } from '@emotion/react';
import Toggle from '@foundation/Toggle/Toggle';
import { Typography } from '@foundation/index';
import { theme } from '@styles/theme';
import ShareRangeIcon from './ShareRangeIcon';

type ShareRangeSettingProps = {
  isPublic: boolean;
  onClick: () => void;
};
const ShareRangeSetting: React.FC<ShareRangeSettingProps> = ({
  isPublic,
  onClick,
}) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 0.75rem;
      `}
    >
      <Typography variant="body2">공개 범위</Typography>
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
              row-gap: 0.25rem;
            `}
          >
            <Typography variant="body3">
              {isPublic ? '링크가 있는 모든 사용자' : '비공개'}
            </Typography>
            <Typography
              variant="captionWeak"
              color={theme.colors.text.subStrong}
            >
              {isPublic
                ? '링크가 있는 인터넷상의 모든 사용자가 볼 수 있음'
                : '나만 볼 수 있음'}
            </Typography>
          </div>
        </div>
        <Toggle isToggled={isPublic} onChange={onClick} />
      </div>
    </div>
  );
};

export default ShareRangeSetting;
