import { css } from '@emotion/react';
import { HTMLElementTypes } from '@/types/utils';

type MainProps = {
  full?: boolean;
  direction: 'column' | 'row';
  children: React.ReactNode;
} & HTMLElementTypes<HTMLDivElement>;

const Layout: React.FC<MainProps> = ({
  full = false,
  direction = 'row',
  children,
  ...args
}) => {
  return (
    <main
      css={css`
        display: flex;
        flex-direction: ${direction};
        width: ${full ? '100%' : 'auto'};
        max-width: ${full ? 'none' : '46.875rem'};
        margin: 0 auto;
        height: 100vh;
      `}
      {...args}
    >
      {children}
    </main>
  );
};

export default Layout;
