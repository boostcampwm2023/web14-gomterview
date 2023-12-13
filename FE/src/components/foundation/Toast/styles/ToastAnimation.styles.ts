import { keyframes } from '@emotion/react';
import { ToastPosition } from '@foundation/Toast/type';

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

const ToastLeftHideAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-110%);
  }
`;

const ToastRightHideAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(110%);
  }
`;

const ToastUpHideAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-110%);
  }
`;

const ToastBottomHideAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(110%);
  }
`;

export const ToastHideAnimation = (position: ToastPosition) => {
  return {
    topLeft: ToastLeftHideAnimation,
    topRight: ToastRightHideAnimation,
    topCenter: ToastUpHideAnimation,
    bottomLeft: ToastLeftHideAnimation,
    bottomRight: ToastRightHideAnimation,
    bottomCenter: ToastBottomHideAnimation,
  }[position];
};
