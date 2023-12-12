import { Typography } from '@foundation/index';
import { css } from '@emotion/react';
import { theme } from '@styles/theme';
import BlankBear from '@assets/images/blank-bear.png';

const QuestionTabPanelBlank = () => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        row-gap: 1rem;
        padding: 1rem;
        height: 100%;
      `}
    >
      <div
        css={css`
          display: flex;
          padding: 1rem;
          width: 100%;
          border-radius: 1rem;
          background-color: ${theme.colors.surface.default};
        `}
      >
        <Typography variant="body1">
          이런! 면접 질문이 하나도 없군요😥
          <br />
          다른 사람이 만든 면접 세트를 가져오거나
          <br />새 면접 세트를 만들어보세요
        </Typography>
      </div>
      <img height="300" src={BlankBear} alt="박스 옆에서 손을 흔드는 곰" />
    </div>
  );
};

export default QuestionTabPanelBlank;
