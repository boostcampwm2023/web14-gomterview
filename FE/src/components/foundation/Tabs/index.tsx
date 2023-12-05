import React, { createContext, useEffect, useState } from 'react';
import TabList from '@foundation/Tabs/TabList';
import TabPanel from '@foundation/Tabs/TabPanel';
import Tab from '@foundation/Tabs/Tab';
import { HTMLElementTypes } from '@/types/utils';

type TabProviderProps = {
  children: React.ReactNode;
  value: string;
} & HTMLElementTypes<HTMLDivElement>;

const initialContext = {
  selectedValue: '',
  handleTabChange: (value: string) => {},
};

export const TabContext = createContext(initialContext);

const Tabs = ({ children, value, ...args }: TabProviderProps) => {
  const [selectedValue, setSelectedValue] = useState(value);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleTabChange = (newValue: string) => {
    setSelectedValue(newValue);
  };

  return (
    <TabContext.Provider value={{ selectedValue, handleTabChange }}>
      <div {...args}>{children}</div>
    </TabContext.Provider>
  );
};

Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.TabPanel = TabPanel;

export default Tabs;
