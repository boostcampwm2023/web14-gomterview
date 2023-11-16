import { css } from '@emotion/react';
import { theme } from '@styles/theme';
import Icon from '@foundation/Icon/Icon';
import Typography from '@foundation/Typography/Typography';

type AnswerToggleButtonType = {
  handleAnswerToggle: () => void;
};

const AnswerToggleButton: React.FC<AnswerToggleButtonType> = ({
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
