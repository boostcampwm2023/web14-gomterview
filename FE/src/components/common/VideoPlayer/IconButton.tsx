import Button from '@foundation/Button/Button';
import { theme } from '@styles/theme';
import Icon from '@foundation/Icon/Icon';
import Typography from '@foundation/Typography/Typography';
import { css } from '@emotion/react';

type IconButtonProps = {
  text: string;
  iconName: string;
};
const IconButton: React.FC<IconButtonProps> = ({ text, iconName }) => {
  return (
    <Button
      css={css`
        display: flex;
        justify-content: center;
        align-self: end;
        gap: 0.5rem;
        padding: 0.5rem 0.75rem;
        color: ${theme.colors.text.default};
        background-color: ${theme.colors.surface.weak};
        &:not(:disabled):hover {
          background-color: ${theme.colors.surface.weakHover};
        }
      `}
    >
      <Icon id={iconName} />
      <Typography variant="body3">{text}</Typography>
    </Button>
  );
};

export default IconButton;
