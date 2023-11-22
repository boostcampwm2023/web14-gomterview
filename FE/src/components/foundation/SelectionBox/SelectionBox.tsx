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
  defaultChecked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & HTMLElementTypes<HTMLLabelElement>;

const SelectionBox: React.FC<SelectionButtonProps> = ({
  children,
  id,
  name,
  lineDirection = 'left',
  onChange,
  value,
  defaultChecked,
  ...args
}) => {
  return (
    <div>
      <input
        id={id}
        name={name}
        type={name ? 'radio' : 'checkbox'}
        onChange={onChange}
        value={value}
        defaultChecked={defaultChecked}
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
