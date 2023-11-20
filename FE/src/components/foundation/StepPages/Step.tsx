import { css } from '@emotion/react';

type StepProps<T> = {
  page: T;
  path: T;
  children: React.ReactNode;
};

const Step = <T,>({ page, children, path }: StepProps<T>) => {
  return (
    <div
      css={css`
        display: ${page === path ? 'block' : 'none'};
      `}
    >
      {children}
    </div>
  );
};

export default Step;
