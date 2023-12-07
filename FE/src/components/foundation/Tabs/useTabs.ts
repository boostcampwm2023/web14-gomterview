import { useContext } from 'react';
import { TabContext } from '@foundation/Tabs/index';

const useTabs = () => {
  return useContext(TabContext);
};

export default useTabs;
