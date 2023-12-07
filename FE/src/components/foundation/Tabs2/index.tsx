import React, { createContext, useState } from 'react';
import { HTMLElementTypes } from '@/types/utils';
import TabPanel2 from './TabPanel2';
import Tab2 from '@foundation/Tabs2/Tab2';

type TabProviderProps = {
  children: React.ReactNode;
  initialValue?: string;
} & HTMLElementTypes<HTMLDivElement>;

const initialContext = {
  currentValue: '0',
  setCurrentValue: (value: string) => {},
};

export const TabContext = createContext(initialContext);

const Tabs2 = ({ children, initialValue = '0', ...args }: TabProviderProps) => {
  const [currentValue, setCurrentValue] = useState(initialValue);

  return (
    <TabContext.Provider value={{ currentValue, setCurrentValue }}>
      <div {...args}>{children}</div>
    </TabContext.Provider>
  );
};

Tabs2.Tab = Tab2;
Tabs2.TabPanel = TabPanel2;

export default Tabs2;
