import { PATH } from '@constants/path';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import axios, { isAxiosError } from 'axios';
import { PropsWithChildren } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { Navigate } from 'react-router-dom';
import logAPIErrorToSentry from './utils/logAPIErrorToSentry';
import { API } from '@constants/api';
import api from './apis/axios';
import SomethingWrongErrorPage from '@page/errorPage/SomethingWrong';

const APIErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  if (
    isAxiosError<{
      errorCode: string;
      message: string;
    }>(error)
  ) {
    if (error.code === 'ECONNABORTED') {
      logAPIErrorToSentry(error, {
        name: 'TimeoutException',
        level: 'fatal',
      });
    }
    // TODO: 요거는 어떻게 처리하지?

    const responseBody = error.response?.data;

    //TODO: 각 핸들러로 분리
    switch (responseBody?.errorCode) {
      case 'W01':
        logAPIErrorToSentry(error, {
          name: 'WorkbookNotFoundException',
          level: 'warning',
        });
        break;
      case 'W02':
        logAPIErrorToSentry(error, {
          name: 'WorkbookForbiddenException',
          level: 'warning',
        });
        break;
      case 'W03':
        logAPIErrorToSentry(error, {
          name: 'NeedToFindByWorkbookIdException',
          level: 'warning',
        });
        break;
      case 'T01':
        logAPIErrorToSentry(error, {
          name: 'InvalidTokenException',
          level: 'warning',
        });
        break;
      case 'T02':
        axios({
          method: 'patch',
          url: API.REISSUE,
          withCredentials: true,
        })
          .then(() => {
            return api.request(error.config!);
            // TODO: 타입 처리 필요
          })
          .catch(() => {
            alert('세션이 만료되었습니다. 다시 로그인해 주시기 바랍니다.');
            return <Navigate to={PATH.ROOT} />;
          });
        logAPIErrorToSentry(error, {
          name: 'TokenExpiredException',
          level: 'warning',
        });
        break;

      case 'A01':
        logAPIErrorToSentry(error, {
          name: 'AnswerNotFoundException',
          level: 'warning',
        });
        break;
      case 'A02':
        logAPIErrorToSentry(error, {
          name: 'AnswerForbiddenException',
          level: 'warning',
        });
        break;

      case 'Q01':
        logAPIErrorToSentry(error, {
          name: 'QuestionNotFoundException',
          level: 'warning',
        });
        break;
      case 'Q02':
        logAPIErrorToSentry(error, {
          name: 'QuestionForbiddenException',
          level: 'warning',
        });
        break;

      // TODO: C01 어디갔지?
      case 'C02':
        logAPIErrorToSentry(error, {
          name: 'CategoryNotFoundException',
          level: 'warning',
        });
        break;

      case 'M01':
        logAPIErrorToSentry(error, {
          name: 'MemberNotFoundException',
          level: 'warning',
        });
        break;

      case 'V02':
        logAPIErrorToSentry(error, {
          name: 'VideoAccessForbiddenException',
          level: 'warning',
        });
        break;
      case 'V03':
        logAPIErrorToSentry(error, {
          name: 'VideoNotFoundException',
          level: 'warning',
        });
        break;
      case 'V04':
        logAPIErrorToSentry(error, {
          name: 'VideoOfWithdrawnMemberException',
          level: 'warning',
        });
        break;

      case 'V01':
        logAPIErrorToSentry(error, {
          name: 'IDriveException',
        });
        break;

      case 'V05':
        logAPIErrorToSentry(error, {
          name: 'RedisDeleteException',
        });
        break;

      case 'V06':
        logAPIErrorToSentry(error, {
          name: 'RedisRetrieveException',
        });
        break;

      case 'V07':
        logAPIErrorToSentry(error, {
          name: 'RedisSaveException',
        });
        break;

      case 'V08':
        logAPIErrorToSentry(error, {
          name: 'Md5HashException',
        });
        break;

      case 'SERVER':
        logAPIErrorToSentry(error, {
          name: 'ManipulatedTokenNotFiltered',
          level: 'fatal',
        });
        break;
    }
    return <SomethingWrongErrorPage />;
  } else {
    throw error;
    // 제어된 예외가 아닌 경우, 에러를 다시 던져서 UnknownBoundary로 넘어간다.
  }
};

const APIErrorBoundary: React.FC<PropsWithChildren> = ({ children }) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary FallbackComponent={APIErrorFallback} onReset={reset}>
      {children}
    </ErrorBoundary>
  );
};

export default APIErrorBoundary;
