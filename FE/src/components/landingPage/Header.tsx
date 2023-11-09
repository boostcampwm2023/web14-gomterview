import { css } from '@emotion/react';
import Logo from '@common/Logo/Logo';
import GoogleLoginButton from '@components/landingPage/GoogleLoginButton';

const Header: React.FC = () => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
      `}
    >
      <Logo />
      <GoogleLoginButton />
    </div>
  );
};

export default Header;
