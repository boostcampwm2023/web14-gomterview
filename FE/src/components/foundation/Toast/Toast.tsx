import {
  ToastFadeOutUpAnimation,
  ToastProgressBarAnimation,
  ToastTypeIconName,
  ToastTypeStyle,
} from '@foundation/Toast/Toast.styles';
import { useCallback, useRef, useState } from 'react';
import { ToastEvent, ToastProps } from '@foundation/Toast/type';
import { css } from '@emotion/react';

import { eventManager } from '@foundation/Toast/EventManger';
import { theme } from '@styles/theme';
import { Box, Icon } from '@foundation/index';
import { collapseToast } from '@foundation/Toast/collapseToast';
import useAnimationEnd from '@hooks/useAnimationEnd';

const Toast: React.FC<ToastProps> = ({
  toastId,
  text,
  autoClose = 3000,
  closeOnClick = true,
  type = 'default',
  pauseOnHover = true,
}) => {
  const toastRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const onProgressAnimationEnd = useCallback(() => setIsExiting(true), []);

  const onExitingAnimationEnd = useCallback(() => {
    collapseToast(toastRef.current!, () => {
      eventManager.emit(ToastEvent.Delete, toastId);
    });
  }, [toastId]);

  useAnimationEnd(toastRef, onExitingAnimationEnd, [toastId]);

  useAnimationEnd(progressRef, () => autoClose && onProgressAnimationEnd, [
    autoClose,
    onProgressAnimationEnd,
  ]);

  const handleClick = () => {
    closeOnClick && onProgressAnimationEnd();
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
            animation: ${isExiting
              ? css`
                  ${ToastFadeOutUpAnimation} 0.8s forwards
                `
              : 'none'};
          `,
          ToastTypeStyle[type],
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
          ref={progressRef}
          css={css`
            position: absolute;
            bottom: 0;
            height: 0.3125rem;
            width: 100%;
            background-color: ${theme.colors.point.primary.default};
            transform-origin: left;
            animation: ${autoClose
              ? css`
                  ${ToastProgressBarAnimation} ${autoClose}ms linear
              forwards
                `
              : 'none'};
            animation-play-state: ${isPaused ? 'paused' : 'running'};
          `}
        />
      </Box>
    </div>
  );
};

export default Toast;
