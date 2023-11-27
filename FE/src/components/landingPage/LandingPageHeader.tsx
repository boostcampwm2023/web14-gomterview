import { Logo } from '@common/index';
import { css } from '@emotion/react';

const LandingPageHeader: React.FC = () => {
  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2rem;
      `}
    >
      <Logo />
    </div>
  );
};

export default LandingPageHeader;
