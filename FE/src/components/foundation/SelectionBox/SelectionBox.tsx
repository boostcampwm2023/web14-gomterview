import { css } from '@emotion/react';
import { selectionBox, selectionBoxDirection } from './SelectionBox.styles';
import { HTMLElementTypes } from '@/types/utils';
import { theme } from '@styles/theme';

type SelectionButtonProps = {
  children: React.ReactNode;
  id: string;
  name?: string;
  lineDirection?: 'left' | 'right' | 'top' | 'bottom';
  value?: string;
  checked?: boolean;
  onClick?: () => void;
} & HTMLElementTypes<HTMLLabelElement>;

const SelectionBox: React.FC<SelectionButtonProps> = ({
  children,
  id,
  name,
  lineDirection = 'left',
  onClick,
  value,
  checked,
  ...args
}) => {
  return (
    <div>
      <input
        readOnly
        id={id}
        name={name}
        type={name ? 'radio' : 'checkbox'}
        onClick={onClick}
        value={value}
        checked={checked}
        css={css`
          display: none;
          &:checked + label {
            ${selectionBox}
            ${selectionBoxDirection[lineDirection]}
            color: ${theme.colors.text.default};
          }
        `}
      />
      <label
        htmlFor={id}
        css={css`
          display: inline-block;
          position: relative;
          padding: 0 2rem;
          width: 100%;
          color: ${theme.colors.text.subStrong};
        `}
        {...args}
      >
        {children}
      </label>
    </div>
  );
};

export default SelectionBox;
