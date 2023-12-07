import {
  ToggleInputStyle,
  ToggleLabelStyle,
} from '@foundation/Toggle/Toggle.styles';
import { useId } from 'react';
import { HTMLElementTypes } from '@/types/utils';

type ToggleProps = {
  isToggled: boolean;
  onClick: () => void;
} & HTMLElementTypes<HTMLInputElement>;
const Toggle: React.FC<ToggleProps> = ({ isToggled, onClick, ...args }) => {
  const toggleId = useId();
  return (
    <>
      <input
        readOnly
        id={toggleId}
        type="checkbox"
        checked={isToggled}
        css={ToggleInputStyle}
        {...args}
      />
      <label htmlFor={toggleId} onClick={onClick} css={ToggleLabelStyle} />
    </>
  );
};

export default Toggle;
