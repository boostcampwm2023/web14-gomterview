import React, { SyntheticEvent, useContext } from 'react';
import { TabContext } from '.';

type TabProps = {
  children?: React.ReactNode;
  name?: string;
  value: string;
  onTabChange?: (e: SyntheticEvent, value: string) => void;
};

const Tab: React.FC<TabProps> = ({ children, value, onTabChange }) => {
  const { handleTabChange } = useContext(TabContext);
  const handleClick = (e: SyntheticEvent) => {
    handleTabChange(value);
    onTabChange && onTabChange(e, value);
  };
  return <div onClick={handleClick}>{children}</div>;
};

export default Tab;
