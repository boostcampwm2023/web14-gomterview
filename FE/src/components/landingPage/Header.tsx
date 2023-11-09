import { css } from '@emotion/react';
import Logo from '@common/Logo/Logo';
import GoogleLoginButton from '@components/landingPage/GoogleLoginButton';

const Header: React.FC = () => {
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
      <GoogleLoginButton />
    </div>
  );
};

export default Header;
