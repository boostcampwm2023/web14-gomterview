import React, { useContext } from 'react';
import addChildElementProps from '@/utils/addChildElementProps';
import { TabContext } from '@foundation/Tabs/index';

type TabProps = {
  children?: React.ReactNode;
  name?: string;
  value: string;
  onClick?: (value: string) => void;
};

const Tab: React.FC<TabProps> = ({ children, name, value, onClick }) => {
  const { selectedValue } = useContext(TabContext);

  return (
    <div onClick={() => onClick && onClick(value)}>
      {addChildElementProps({
        children,
        newProps: {
          name,
          value,
          selectedValue,
          onChange: () => onClick && onClick(value),
        },
      })}
    </div>
  );
};

export default Tab;
