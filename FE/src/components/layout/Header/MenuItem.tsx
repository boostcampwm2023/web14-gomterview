import { css } from '@emotion/react';
import { Typography } from '@foundation/index';
import { theme } from '@styles/theme';
import { Link } from 'react-router-dom';

type MenuItemProps = {
  path: string;
  text: string;
};

const MenuItem: React.FC<MenuItemProps> = ({ path, text }) => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;
        padding: 0.5rem;
        :hover {
          background-color: ${theme.colors.surface.weak};
        }
      `}
    >
      <Link
        to={path}
        css={css`
          text-decoration: none;
        `}
      >
        <Typography variant="body1" color={theme.colors.text.subStrong}>
          {text}
        </Typography>
      </Link>
    </div>
  );
};

export default MenuItem;
