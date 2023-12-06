import Toast from '@foundation/Toast/Toast';
import { css } from '@emotion/react';
import { ToastPositionStyle } from '@foundation/Toast/Toast.styles';
import useToastContainer from '@foundation/Toast/useToastContainer';

export const ToastContainer = () => {
  const { getToastPositionGroupToRender } = useToastContainer();
  const positionGroup = getToastPositionGroupToRender();

  return Array.from(positionGroup).map(([position, toasts]) => (
    <div
      key={position}
      css={[
        css`
          position: fixed;
          display: flex;
          flex-direction: column;
          row-gap: 0.5rem;
          z-index: 9999;
        `,
        ToastPositionStyle[position],
      ]}
    >
      {toasts.map((toastProps) => (
        <Toast key={toastProps.toastId} {...toastProps} />
      ))}
    </div>
  ));
};
