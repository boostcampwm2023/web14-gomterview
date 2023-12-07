import { HTMLElementTypes } from '@/types/utils';
import {
  ToggleInputStyle,
  ToggleLabelStyle,
} from '@foundation/Toggle/Toggle.styles';

type ToggleProps = {
  isToggled: boolean;
  onClick: () => void;
} & HTMLElementTypes<HTMLInputElement>;
const Toggle: React.FC<ToggleProps> = ({ id, isToggled, onClick, ...args }) => {
  return (
    <>
      <input
        readOnly
        id={id}
        type="checkbox"
        checked={isToggled}
        css={ToggleInputStyle}
        {...args}
      />
      <label htmlFor="toggle" onClick={onClick} css={ToggleLabelStyle} />
    </>
  );
};

export default Toggle;
