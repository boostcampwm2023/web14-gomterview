import React from 'react';
import addChildElementProps from '@/utils/addChildElementProps';

type TabProps = {
  children?: React.ReactNode;
  name?: string;
  value: string;
  onClick?: (value: string) => void;
};

const Tab: React.FC<TabProps> = ({ children, name, value, onClick }) => {
  return (
    <div onClick={() => onClick && onClick(value)}>
      {addChildElementProps({
        children,
        newProps: { name, value, onChange: () => onClick && onClick(value) },
      })}
    </div>
  );
};

export default Tab;
