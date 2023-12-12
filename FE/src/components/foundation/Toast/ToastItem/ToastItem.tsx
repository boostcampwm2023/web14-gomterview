import { useRef, useState } from 'react';
import { ToastEvent, ToastProps } from '@foundation/Toast/type';
import { css } from '@emotion/react';
import { theme } from '@styles/theme';
import { Box, Icon, Typography } from '@foundation/index';
import { collapseToast } from '@foundation/Toast/collapseToast';
import { eventManager } from '@foundation/Toast/eventManger';
import {
  ToastProgressBarStyle,
  ToastTypeIconName,
} from '@foundation/Toast/styles/Toast.styles';
import {
  ToastFadeOutUpAnimation,
  ToastHideAnimation,
  ToastProgressBarAnimation,
} from '@foundation/Toast/styles/ToastAnimation.styles';
import { TOAST_DEFAULT_POSITION } from '@foundation/Toast/constants';
import ToastToggleButton from '@foundation/Toast/ToastItem/ToastToggleButton';

const ToastItem: React.FC<ToastProps> = ({
  toastId,
  text,
  autoClose = 3000,
  closeOnClick = true,
  type = 'default',
  pauseOnHover = true,
  position = TOAST_DEFAULT_POSITION,
  toggle = false,
}) => {
  const toastRef = useRef<HTMLDivElement>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  //toggle 모드가 켜져있을 때 펼쳐진 상태인지 저장
  const [isShowing, setIsShowing] = useState(true);
  const [isHiding, setIsHiding] = useState(false);

  const handleExitingAnimationEnd = () => {
    collapseToast(toastRef.current!, () => {
      eventManager.emit(ToastEvent.Delete, toastId);
    });
  };

  const handleProgressAnimationEnd = () => {
    autoClose && setIsExiting(true);
  };

  const handleClick = () => {
    closeOnClick && setIsExiting(true);
  };

  const handleMouseEnter = () => {
    pauseOnHover && autoClose && setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover && autoClose) {
      setIsPaused(false);
    }
  };

  const handleToggleToast = () => {
    setIsHiding((prev) => !prev);
  };

  const handleHideToast = () => {
    if (!toastRef.current) return;

    setIsShowing(false);
    setIsHiding(false);
    toastRef.current.style.opacity = '0';
  };

  const handleShowToast = () => {
    setIsShowing(true);
  };

  const IconType = () =>
    type === 'default' ? null : (
      <Icon id={ToastTypeIconName[type]} width="20" height="20" />
    );

  if (!isShowing)
    return (
      <ToastToggleButton
        position={position}
        reverse={true}
        isToggleMode={toggle}
        onClick={handleShowToast}
      />
    );

  return (
    <div
      ref={toastRef}
      onAnimationEnd={handleHideToast}
      css={css`
        pointer-events: ${isExiting ? 'none' : 'auto'};
        touch-action: ${isExiting ? 'none' : 'auto'};
        animation: ${isHiding
          ? css`0.5s ease-in-out
          ${ToastHideAnimation(position)}`
          : 'none'};
      `}
    >
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
            justify-content: center;
            row-gap: 0.5rem;
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
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              column-gap: 1rem;
            `}
          >
            <IconType />
            <Typography>{text}</Typography>
          </div>
          <ToastToggleButton
            position={position}
            isToggleMode={toggle}
            onClick={handleToggleToast}
          />
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
