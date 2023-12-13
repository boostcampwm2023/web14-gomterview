import { ToastPosition } from '@foundation/Toast/type';
import { Button, Icon } from '@foundation/index';
import { css } from '@emotion/react';
import { theme } from '@styles/theme';

type ToastToggleButtonProps = {
  position: ToastPosition;
  reverse?: boolean;
  isToggleMode: boolean;
  onClick: () => void;
};
const ToastToggleButton: React.FC<ToastToggleButtonProps> = ({
  isToggleMode,
  reverse = false,
  position = 'bottomCenter',
  onClick,
}) => {
  if (!isToggleMode) return null;

  const deg = {
    topLeft: reverse ? 90 : -90,
    topRight: reverse ? -90 : 90,
    topCenter: reverse ? 180 : 0,
    bottomLeft: reverse ? 90 : -90,
    bottomRight: reverse ? -90 : 90,
    bottomCenter: reverse ? 0 : 180,
  };

  return (
    <Button
      variants="secondary"
      onClick={onClick}
      css={css`
        display: flex;
        align-items: center;
        border: none;
        pointer-events: auto;
        touch-action: auto;
        z-index: ${theme.zIndex.toast.content};
        max-width: 3rem;
      `}
    >
      <Icon
        id="angles-up"
        css={css`
          transform: rotate(${deg[position]}deg);
        `}
      />
    </Button>
  );
};

export default ToastToggleButton;
