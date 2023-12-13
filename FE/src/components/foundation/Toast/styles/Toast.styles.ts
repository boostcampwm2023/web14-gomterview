import { css } from '@emotion/react';
import { theme } from '@styles/theme';

const TOAST_GAP = '0.75rem';
export const ToastProgressBarStyle = {
  info: css`
    background-color: ${theme.colors.toast.info};
  `,
  success: css`
    background-color: ${theme.colors.toast.success};
  `,
  warning: css`
    background-color: ${theme.colors.toast.warning};
  `,
  error: css`
    background-color: ${theme.colors.toast.error};
  `,
  default: css`
    background-color: ${theme.colors.toast.default};
  `,
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
    @media (max-width: ${theme.breakpoints.mobileL}) {
      left: 0.25rem;
      right: 0.25rem;
      transform: none;
    }
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
    @media (max-width: ${theme.breakpoints.mobileL}) {
      left: 0.25rem;
      right: 0.25rem;
      transform: none;
    }
  `,
};
