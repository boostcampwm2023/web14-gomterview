import { theme } from '@styles/theme';
import { css } from '@emotion/react';

import Icon from '@foundation/Icon/Icon';
import Typography from '@foundation/Typography/Typography';

type NextButtonType = {
  handleNext: () => void;
};

const NextButton: React.FC<NextButtonType> = ({ handleNext }) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
      `}
      onClick={handleNext}
    >
      <Icon
        id="next" // symbol 옆에 작성한 id를 인자로 받습니다.
        width="2rem"
        height="2rem"
      />
      <Typography variant={'body1'} color={theme.colors.text.white}>
        다음질문
      </Typography>
    </div>
  );
};
export default NextButton;
