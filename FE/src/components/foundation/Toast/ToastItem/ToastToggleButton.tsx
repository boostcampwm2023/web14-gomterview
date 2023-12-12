import { ToastPosition } from '@foundation/Toast/type';
import { Button, Icon } from '@foundation/index';
import { css } from '@emotion/react';

type ToastToggleButtonProps = {
  position: ToastPosition;
  isToggleMode: boolean;
};
const ToastToggleButton: React.FC<ToastToggleButtonProps> = ({
  isToggleMode,
  position = 'bottomCenter',
}) => {
  if (!isToggleMode) return null;

  const deg = {
    topLeft: -90,
    topRight: 90,
    topCenter: 0,
    bottomLeft: -90,
    bottomRight: 90,
    bottomCenter: 180,
  };

  return (
    <Button
      variants="secondary"
      css={css`
        border: none;
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
