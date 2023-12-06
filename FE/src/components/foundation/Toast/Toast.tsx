import {
  ToastTypeIconName,
  ToastTypeStyle,
} from '@foundation/Toast/Toast.styles';
import { useCallback, useEffect, useRef } from 'react';
import { ToastEvent, ToastProps } from '@foundation/Toast/type';
import { css } from '@emotion/react';
import { eventManager } from '@foundation/Toast/EventManger';
import { theme } from '@styles/theme';
import { Box, Icon } from '@foundation/index';

const Toast: React.FC<ToastProps> = ({
  toastId,
  text,
  autoClose = 3000,
  closeOnClick = true,
  type = 'default',
  pauseOnHover = true,
}) => {
  const timerRef = useRef<number>();
  const onClose = useCallback(() => {
    eventManager.emit(ToastEvent.Delete, toastId);
  }, [toastId]);

  useEffect(() => {
    if (autoClose) {
      timerRef.current = window.setTimeout(onClose, Number(autoClose));
      return () => clearTimeout(timerRef.current);
    }
  }, [autoClose, onClose]);

  const handleClick = () => {
    closeOnClick && onClose();
  };

  const handleMouseEnter = () => {
    pauseOnHover && autoClose && clearTimeout(timerRef.current);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover && autoClose) {
      timerRef.current = window.setTimeout(onClose, Number(autoClose));
    }
  };

  const IconType = () =>
    type === 'default' ? null : (
      <Icon id={ToastTypeIconName[type]} width="20" height="20" />
    );

  return (
    <Box
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      css={[
        css`
          display: flex;
          align-items: center;
          column-gap: 1rem;
          padding: 1rem;
          min-width: 20rem;
          border-radius: 0.5rem;
          background-color: ${theme.colors.surface.default};
        `,
        ToastTypeStyle[type],
      ]}
    >
      <IconType />
      {text}
    </Box>
  );
};

export default Toast;
