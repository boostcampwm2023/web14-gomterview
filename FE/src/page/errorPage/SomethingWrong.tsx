import ErrorPageLayout from '@components/errorPage/ErrorPageLayout';
import ErrorBear from '@assets/images/error-bear.png';
import { css } from '@emotion/react';
import { Typography } from '@foundation/index';

const SomethingWrongErrorPage = () => {
  return (
    <ErrorPageLayout>
      <img
        src={ErrorBear}
        alt={'노트북을 하는 곰돌이의 뒷모습'}
        css={css`
          max-width: 40vw;
        `}
      />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <Typography variant="title1">이런 무언가 잘못되었어요</Typography>
      </div>
    </ErrorPageLayout>
  );
};

export default SomethingWrongErrorPage;
