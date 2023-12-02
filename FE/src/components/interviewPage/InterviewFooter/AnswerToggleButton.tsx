import { css } from '@emotion/react';
import { Icon, Typography } from '@foundation/index';
import { theme } from '@styles/theme';

type AnswerToggleButtonProps = {
  handleAnswerToggle: () => void;
};

const AnswerToggleButton: React.FC<AnswerToggleButtonProps> = ({
  handleAnswerToggle,
}) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
      `}
      onClick={handleAnswerToggle}
    >
      <Icon id="script" width="2rem" height="2rem" />
      <Typography variant={'body1'} color={theme.colors.text.white}>
        스크립트
      </Typography>
    </div>
  );
};
export default AnswerToggleButton;
