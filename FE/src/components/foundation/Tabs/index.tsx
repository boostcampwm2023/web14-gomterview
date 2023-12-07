import React, { createContext, useState } from 'react';
import { HTMLElementTypes } from '@/types/utils';
import TabPanel from './TabPanel';
import Tab from '@foundation/Tabs/Tab';

type TabProviderProps = {
  children: React.ReactNode;
  initialValue?: string;
} & HTMLElementTypes<HTMLDivElement>;

const initialContext = {
  currentValue: '0',
  setCurrentValue: (value: string) => {},
};

export const TabContext = createContext(initialContext);

const Tabs = ({ children, initialValue = '0', ...args }: TabProviderProps) => {
  const [currentValue, setCurrentValue] = useState(initialValue);

  return (
    <TabContext.Provider value={{ currentValue, setCurrentValue }}>
      <div {...args}>{children}</div>
    </TabContext.Provider>
  );
};

Tabs.Tab = Tab;
Tabs.TabPanel = TabPanel;

export default Tabs;
