import React, { SyntheticEvent } from 'react';
import useTabs from '@foundation/Tabs2/useTabs';

type TabProps = {
  children?: React.ReactNode;
  name?: string;
  value: string;
  onTabChange?: (e: SyntheticEvent, value: string) => void;
};

const Tab2: React.FC<TabProps> = ({ children, value }) => {
  const { setCurrentValue } = useTabs();
  const handleClick = () => {
    setCurrentValue(value);
  };

  return <div onClick={handleClick}>{children}</div>;
};

export default Tab2;
