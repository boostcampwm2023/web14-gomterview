import { css } from '@emotion/react';
import MenuList from './MenuList';

const Menu = () => {
  return (
    <div
      css={css`
        display: flex;
        gap: 1rem;
      `}
    >
      <MenuList />
    </div>
  );
};

export default Menu;
