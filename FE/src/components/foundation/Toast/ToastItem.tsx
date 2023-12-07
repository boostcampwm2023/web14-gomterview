import { useRef, useState } from 'react';
import { ToastEvent, ToastProps } from '@foundation/Toast/type';
import { css } from '@emotion/react';
import { theme } from '@styles/theme';
import { Box, Icon } from '@foundation/index';
import { collapseToast } from '@foundation/Toast/collapseToast';
import { eventManager } from '@foundation/Toast/eventManger';
import {
  ToastFadeOutUpAnimation,
  ToastProgressBarAnimation,
  ToastProgressBarStyle,
  ToastTypeIconName,
} from '@foundation/Toast/Toast.styles';

const ToastItem: React.FC<ToastProps> = ({
  toastId,
  text,
  autoClose = 3000,
  closeOnClick = true,
  type = 'default',
  pauseOnHover = true,
}) => {
  const toastRef = useRef<HTMLDivElement>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleExitingAnimationEnd = () => {
    collapseToast(toastRef.current!, () => {
      eventManager.emit(ToastEvent.Delete, toastId);
    });
  };

  const handleProgressAnimationEnd = () => {
    autoClose && setIsExiting(true);
  };

  const handleClick = () => {
    closeOnClick && handleProgressAnimationEnd();
  };

  const handleMouseEnter = () => {
    pauseOnHover && autoClose && setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover && autoClose) {
      setIsPaused(false);
    }
  };

  const IconType = () =>
    type === 'default' ? null : (
      <Icon id={ToastTypeIconName[type]} width="20" height="20" />
    );

  return (
    <div ref={toastRef}>
      <Box
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onAnimationEnd={handleExitingAnimationEnd}
        css={[
          css`
            position: relative;
            display: flex;
            flex-direction: column;
            row-gap: 0.5rem;
            min-width: 20rem;
            border-radius: 0.5rem;
            overflow: hidden;
            background-color: ${theme.colors.surface.default};
            cursor: pointer;
            animation: ${isExiting
              ? css`
                  ${ToastFadeOutUpAnimation} 0.8s forwards
                `
              : 'none'};
          `,
        ]}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            column-gap: 1rem;
            padding: 1rem;
          `}
        >
          <IconType />
          {text}
        </div>
        <div
          onAnimationEnd={handleProgressAnimationEnd}
          css={[
            css`
              position: absolute;
              bottom: 0;
              height: 0.3125rem;
              width: 100%;
              transform-origin: left;
              animation: ${autoClose
                ? css`
                    ${ToastProgressBarAnimation} ${autoClose}ms linear
                        forwards
                  `
                : 'none'};
              animation-play-state: ${isPaused ? 'paused' : 'running'};
            `,
            ToastProgressBarStyle[type],
          ]}
        />
      </Box>
    </div>
  );
};

export default ToastItem;
