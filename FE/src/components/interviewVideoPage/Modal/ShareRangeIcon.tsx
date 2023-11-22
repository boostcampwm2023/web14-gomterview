import Icon from '@foundation/Icon/Icon';
import { css } from '@emotion/react';
import { theme } from '@styles/theme';

type ShareRangeIconProps = {
  isPublic: boolean;
};
const ShareRangeIcon: React.FC<ShareRangeIconProps> = ({ isPublic }) => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: baseline;
        padding: 0.5rem;
        border-radius: 10rem;
        background-color: ${theme.colors.surface[isPublic ? 'active' : 'weak']};
      `}
    >
      <Icon id={isPublic ? 'public' : 'private'} />
    </div>
  );
};

export default ShareRangeIcon;