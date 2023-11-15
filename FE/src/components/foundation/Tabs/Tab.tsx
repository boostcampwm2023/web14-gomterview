import React from 'react';

type TabProps = {
  children?: React.ReactNode;
  name?: string;
  value: string;
  onClick?: (value: string) => void;
};

const Tab: React.FC<TabProps> = ({ children, value, onClick }) => {
  return <div onClick={() => onClick && onClick(value)}>{children}</div>;
};

export default Tab;
