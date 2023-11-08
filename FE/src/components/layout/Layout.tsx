import { css } from '@emotion/react';

type MainProps = {
  full?: boolean;
  direction: 'column' | 'row';
  children: React.ReactNode;
};

const Layout: React.FC<MainProps> = ({
  full = false,
  direction = 'row',
  children,
}) => {
  return (
    <main
      css={css`
        display: flex;
        flex-direction: ${direction};
        width: ${full ? '100%' : 'auto'};
        max-width: ${full ? 'none' : '750px'};
        height: 100vh;
        margin: 0 auto;
      `}
    >
      {children}
    </main>
  );
};

export default Layout;
