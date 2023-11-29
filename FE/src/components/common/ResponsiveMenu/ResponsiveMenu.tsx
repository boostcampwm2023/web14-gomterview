import { useEffect, useState } from 'react';
import { Box } from '@foundation/index';
import { css } from '@emotion/react';
import { HTMLElementTypes } from '@/types/utils';
import useBreakpoint from '@hooks/useBreakPoint';

type ResponsiveMenuType = HTMLElementTypes<HTMLDivElement> & {
  location?: 'left' | 'right';
};
const ResponsiveMenu: React.FC<ResponsiveMenuType> = ({
  children,
  location = 'left',
  ...arg
}) => {
  const [translateY, setTranslateY] = useState(100);
  const isDeviceBreakpoint = useBreakpoint();
  useEffect(() => {
    let lastKnownScrollPosition = 0;
    let ticking = false;
    let throttleTimeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      lastKnownScrollPosition = 100 + window.scrollY;

      if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
          if (!ticking) {
            window.requestAnimationFrame(() => {
              setTranslateY(lastKnownScrollPosition);
              ticking = false;
              throttleTimeout = null;
            });

            ticking = true;
          }
        }, 100);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (throttleTimeout) {
        clearTimeout(throttleTimeout);
      }
    };
  }, []);

  const SideCSS = css`
    position: absolute;
    transform: translateY(${translateY}px);
    transition: transform 0.3s linear;
    width: auto;
    ${location === 'left' ? 'left: -120px;' : 'right: -120px;'}
  `;

  const InlineCSS = css`
    position: static;
    transform: none;
    width: 100%;
  `;

  return (
    <Box
      css={css`
        height: auto;
        ${isDeviceBreakpoint('laptop') ? InlineCSS : SideCSS}
      `}
      {...arg}
    >
      {children}
    </Box>
  );
};

export default ResponsiveMenu;
