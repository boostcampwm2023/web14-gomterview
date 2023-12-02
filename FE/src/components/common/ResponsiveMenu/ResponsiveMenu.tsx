import { Interpolation, Theme, css } from '@emotion/react';
import { HTMLElementTypes } from '@/types/utils';
import useBreakpoint from '@hooks/useBreakPoint';
import useThrottleScroll from '@hooks/useThrottleScroll';

type ResponsiveMenuType = HTMLElementTypes<HTMLDivElement> & {
  location?: 'left' | 'right';
  top?: number;
  inlineCss?: Interpolation<Theme>;
  sideCss?: Interpolation<Theme>;
};

const ResponsiveMenu: React.FC<ResponsiveMenuType> = ({
  children,
  location = 'left',
  top = 23,
  inlineCss,
  sideCss,
  ...arg
}) => {
  const isDeviceBreakpoint = useBreakpoint();
  const translateY = useThrottleScroll(100, top);

  return (
    <div
      css={[
        css`
          height: auto;
        `,
        isDeviceBreakpoint('laptop')
          ? css`
              position: static;
              transform: none;
              width: 100%;
            `
          : css`
              position: absolute;
              transform: translateY(${translateY}px);
              transition: transform 0.3s linear;
              width: auto;
              ${location === 'left' ? 'left: -120px;' : 'right: -120px;'}
            `,
        isDeviceBreakpoint('laptop') ? inlineCss : sideCss,
      ]}
      {...arg}
    >
      {children}
    </div>
  );
};

export default ResponsiveMenu;
