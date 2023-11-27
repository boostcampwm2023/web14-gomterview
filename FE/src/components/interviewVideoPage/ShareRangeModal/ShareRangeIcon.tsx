import { css } from '@emotion/react';
import { Icon } from '@foundation/index';
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
        align-items: center;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 10rem;
        background-color: ${theme.colors.surface[isPublic ? 'active' : 'weak']};
      `}
    >
      <Icon id={isPublic ? 'public' : 'private'} width="24" height="24" />
    </div>
  );
};

export default ShareRangeIcon;
