import React, { SyntheticEvent } from 'react';
import useTabs from '@foundation/Tabs2/useTabs';
import enhanceChildElement from '@/utils/enhanceChildElement';

type TabProps = {
  children?: React.ReactNode;
  name?: string;
  value: string;
  onTabChange?: (e: SyntheticEvent, value: string) => void;
};

const Tab2: React.FC<TabProps> = ({ children, value }) => {
  const { currentValue, setCurrentValue } = useTabs();
  const handleClick = () => {
    setCurrentValue(value);
  };

  return (
    <div onClick={handleClick}>
      {enhanceChildElement({
        children: children,
        newProps: {
          value: value,
          checked: currentValue === value,
        },
      })}
    </div>
  );
};

export default Tab2;
