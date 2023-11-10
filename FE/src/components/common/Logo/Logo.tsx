import logo from '@assets/images/logo.png';
import { css } from '@emotion/react';
import Typography from '@foundation/Typography/Typography';

const Logo: React.FC = ({}) => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        column-gap: 1rem;
      `}
    >
      <img
        src={logo}
        alt={'곰돌이 로고'}
        css={css`
          width: 2.5rem;
        `}
      />
      <Typography variant="title2">곰터뷰</Typography>
    </div>
  );
};

export default Logo;
