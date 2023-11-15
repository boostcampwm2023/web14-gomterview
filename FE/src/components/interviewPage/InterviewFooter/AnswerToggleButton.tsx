import { css } from '@emotion/react';

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
        gap: 0.25rem;
      `}
      onClick={handleAnswerToggle}
    >
      <Icon id="script" width="2rem" height="2rem" />
      <Typography variant={'body1'} color="white">
        스크립트
      </Typography>
    </div>
  );
};
export default AnswerToggleButton;
