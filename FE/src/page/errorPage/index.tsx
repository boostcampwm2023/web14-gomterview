import ErrorPageLayout from '@components/errorPage/ErrorPageLayout';
import ErrorBear from '@assets/images/error-bear.png';
import { css } from '@emotion/react';
import { Typography } from '@foundation/index';
import { Location, useLocation, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError() as Response;
  const location = useLocation() as Location<Response>;

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
        <Typography variant="title1">{`${
          error?.status || location.state?.status
        } error`}</Typography>
        <Typography variant="body1">
          {error?.statusText || location.state?.statusText}
        </Typography>
      </div>
    </ErrorPageLayout>
  );
};

export default ErrorPage;
