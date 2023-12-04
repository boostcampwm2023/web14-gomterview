import { PropsWithChildren } from 'react';

const MenuItem: React.FC<PropsWithChildren> = ({ children }) => {
  return <div>{children}</div>;
};

export default MenuItem;
