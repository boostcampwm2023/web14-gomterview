import { css } from '@emotion/react';
import { selectionBox, selectionBoxDirection } from './SelectionBox.styles';
import { HTMLElementTypes } from '@/types/utils';

type SelectionButtonProps = {
  children: React.ReactNode;
  id: string;
  name?: string;
  lineDirection?: 'left' | 'right' | 'top' | 'bottom';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & HTMLElementTypes<HTMLDivElement>;

const SelectionBox: React.FC<SelectionButtonProps> = ({
  children,
  id,
  name,
  lineDirection = 'left',
  onChange,
  value,
  ...args
}) => {
  return (
    <div
      css={css`
        display: inline-block;
        position: relative;
        padding: 0 2rem;
      `}
      {...args}
    >
      <input
        id={id}
        name={name}
        type={name ? 'radio' : 'checkbox'}
        onChange={onChange}
        value={value}
        css={css`
          display: none;
        `}
      />
      <label
        htmlFor={id}
        css={css`
          ${'#' + id}:checked + & {
            ${selectionBox}
            ${selectionBoxDirection[lineDirection]}
          }
        `}
      >
        {children}
      </label>
    </div>
  );
};

export default SelectionBox;
