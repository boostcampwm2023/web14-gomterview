import ErrorPageLayout from '@components/errorPage/ErrorPageLayout';
import ErrorBear from '@assets/images/error-bear.png';
import { css } from '@emotion/react';
import { Typography } from '@foundation/index';
import { useRouteError } from 'react-router-dom';
import { AxiosError } from 'axios';

const LoaderErrorPage = () => {
  const error = useRouteError() as AxiosError;

  if (process.env.NODE_ENV === 'development') console.log(error);

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
        <Typography variant="title1">{`${error.response?.status} error`}</Typography>
      </div>
    </ErrorPageLayout>
  );
};

export default LoaderErrorPage;
