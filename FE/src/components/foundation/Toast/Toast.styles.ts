import { css } from '@emotion/react';

const TOAST_GAP = '0.75rem';
export const ToastTypeStyle = {
  info: css``,
  success: css``,
  warning: css``,
  error: css``,
  default: css``,
};

export const ToastTypeIconName = {
  info: 'info-round',
  success: 'check-round',
  warning: 'warning',
  error: 'bomb',
  default: null,
};

export const ToastPositionStyle = {
  topLeft: css`
    top: ${TOAST_GAP};
    left: ${TOAST_GAP};
  `,
  topRight: css`
    top: ${TOAST_GAP};
    right: ${TOAST_GAP};
  `,
  topCenter: css`
    top: ${TOAST_GAP};
    left: 50%;
    transform: translateX(-50%);
    z-index: 10000;
  `,
  bottomLeft: css`
    bottom: ${TOAST_GAP};
    left: ${TOAST_GAP};
  `,
  bottomRight: css`
    bottom: ${TOAST_GAP};
    right: ${TOAST_GAP};
  `,
  bottomCenter: css`
    bottom: ${TOAST_GAP};
    left: 50%;
    transform: translateX(-50%);
    z-index: 10000;
  `,
};
