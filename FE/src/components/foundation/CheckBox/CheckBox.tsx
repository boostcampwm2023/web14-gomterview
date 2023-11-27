import { css } from '@emotion/react';
import { Icon } from '..';
import { theme } from '@styles/theme';
import { HTMLElementTypes } from '@/types/utils';

type CheckBoxProps = {
  id: string;
  children?: React.ReactNode;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & HTMLElementTypes<HTMLLabelElement>;

const CheckBox: React.FC<CheckBoxProps> = ({
  id,
  children,
  checked,
  onChange,
  ...args
}) => {
  return (
    <div>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        css={css`
          display: none;
          &:checked + label svg {
            fill: ${theme.colors.point.primary.default};
          }
        `}
      />
      <label
        htmlFor={id}
        css={css`
          display: flex;
          align-items: center;
        `}
        {...args}
      >
        <Icon
          id="check-box"
          width="1.5rem"
          height="1.5rem"
          css={css`
            fill: ${theme.colors.surface.weakHover};
          `}
        />
        {children}
      </label>
    </div>
  );
};

export default CheckBox;
