import React, { createContext, useState } from 'react';
import TabList from '@foundation/Tabs/TabList';
import TabPanel from '@foundation/Tabs/TabPanel';
import Tab from '@foundation/Tabs/Tab';

type TabProviderProps = {
  children: React.ReactNode;
  value: string;
};

const initialContext = {
  selectedValue: '1',
  handleTabChange: (value?: string) => {},
};

export const TabContext = createContext(initialContext);

const Tabs = ({ children, value }: TabProviderProps) => {
  const [selectedValue, setSelectedValue] = useState(
    value || initialContext.selectedValue
  );

  const handleTabChange = (newValue?: string) => {
    setSelectedValue(newValue || initialContext.selectedValue);
  };

  return (
    <TabContext.Provider value={{ selectedValue, handleTabChange }}>
      {children}
    </TabContext.Provider>
  );
};

Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.TabPanel = TabPanel;

export default Tabs;
