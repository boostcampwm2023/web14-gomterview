import { css } from '@emotion/react';
import { HTMLElementTypes } from '@/types/utils';
import useBreakpoint from '@hooks/useBreakPoint';
import useThrottleScroll from '@hooks/useThrottleScroll';

type ResponsiveMenuType = HTMLElementTypes<HTMLDivElement> & {
  location?: 'left' | 'right';
  top?: number;
  inlineStyle?: string;
  sideStyle?: string;
};

const ResponsiveMenu: React.FC<ResponsiveMenuType> = ({
  children,
  location = 'left',
  top = 100,
  inlineStyle = ``,
  sideStyle = ``,
  ...arg
}) => {
  const isDeviceBreakpoint = useBreakpoint();
  const translateY = useThrottleScroll(100, top);

  const SideCSS = css`
    position: absolute;
    transform: translateY(${translateY}px);
    transition: transform 0.3s linear;
    width: auto;
    ${location === 'left' ? 'left: -120px;' : 'right: -120px;'}
    ${sideStyle}
  `;

  const InlineCSS = css`
    position: static;
    transform: none;
    width: 100%;
    ${inlineStyle}
  `;

  return (
    <div
      css={css`
        height: auto;
        ${isDeviceBreakpoint('laptop') ? InlineCSS : SideCSS}
      `}
      {...arg}
    >
      {children}
    </div>
  );
};

export default ResponsiveMenu;
