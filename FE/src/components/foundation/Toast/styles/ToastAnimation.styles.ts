import { keyframes } from '@emotion/react';

export const ToastFadeOutUpAnimation = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-1.5rem);
  }
`;

export const ToastProgressBarAnimation = keyframes`
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
`;

export const ToastLeftHideAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-110%);
  }
`;

export const ToastRightHideAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(110%);
  }
`;
