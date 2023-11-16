import logo from '@assets/images/logo.png';
import { css } from '@emotion/react';
import Typography from '@foundation/Typography/Typography';
import { Link } from 'react-router-dom';
import { theme } from '@styles/theme';
import { PATH } from '@constants/path';

const Logo: React.FC = () => {
  return (
    <Link
      to={PATH.ROOT}
      css={css`
        display: flex;
        justify-content: flex-start;
        align-items: center;
        column-gap: 1rem;
        text-decoration: none;
        cursor: pointer;
      `}
    >
      <img
        src={logo}
        alt={'곰돌이 로고'}
        css={css`
          width: 2.5rem;
        `}
      />
      <Typography variant="title2" color={theme.colors.text.default}>
        곰터뷰
      </Typography>
    </Link>
  );
};

export default Logo;
