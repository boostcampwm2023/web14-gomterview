import { HTMLElementTypes } from '@/types/utils';
import {
  ToggleInputStyle,
  ToggleLabelStyle,
} from '@foundation/Toggle/Toggle.styles';

type ToggleProps = {
  isToggled: boolean;
} & HTMLElementTypes<HTMLInputElement>;
const Toggle: React.FC<ToggleProps> = ({ isToggled, ...args }) => {
  return (
    <>
      <input
        readOnly
        id="toggle"
        type="checkbox"
        checked={isToggled}
        css={ToggleInputStyle}
        {...args}
      />
      <label htmlFor="toggle" css={ToggleLabelStyle} />
    </>
  );
};

export default Toggle;
