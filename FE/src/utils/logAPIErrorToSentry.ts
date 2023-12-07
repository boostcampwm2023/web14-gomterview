import * as Sentry from '@sentry/react';
import { AxiosError } from 'axios';

const logAPIErrorToSentry = (
  error: AxiosError<{
    errorCode?: string;
    message?: string;
  }>,
  {
    name = error.name,
    level = 'error',
  }: {
    name?: string;
    level?: Sentry.SeverityLevel;
  }
) => {
  error.name = name;

  Sentry.withScope((scope) => {
    scope.setLevel(level);
    scope.setTags({
      api: error.name,
      errorCode: error.response?.data.errorCode,
      status: error.status,
    });
    scope.setTag('environment', process.env.NODE_ENV);

    scope.setContext('API Request Detail', {
      url: error.config?.url,
      method: error.config?.method,
      data: error.config?.data,
      params: error.config?.params,
    });
    scope.setContext('API Response Detail', {
      status: error.response?.status,
      data: error.response?.data,
    });

    scope.setFingerprint([
      error.config?.method ?? 'unknown method',
      error.status?.toString() ?? 'unknown status',
      error.config?.url ?? 'unknown url',
    ]);

    Sentry.captureMessage(error.name);
  });
};

export default logAPIErrorToSentry;
