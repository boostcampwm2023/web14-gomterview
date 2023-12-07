import { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import * as Sentry from '@sentry/react';
import SomethingWrongErrorPage from '@page/errorPage/SomethingWrong';

const UnknownErrorBoundary: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ErrorBoundary
      FallbackComponent={SomethingWrongErrorPage}
      onError={(error) => {
        Sentry.withScope((scope) => {
          scope.setLevel('fatal');
          scope.setTags({
            status: 'unknown',
          });
          scope.setTag('environment', process.env.NODE_ENV);
          scope.setContext('trace', {
            message: error.message,
            stack: error.stack,
            name: error.name,
          });
          Sentry.captureMessage(error.name);
        });
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default UnknownErrorBoundary;
