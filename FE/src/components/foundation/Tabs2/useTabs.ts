import { useContext } from 'react';
import { TabContext } from '@foundation/Tabs2/index';

const useTabs = () => {
  return useContext(TabContext);
};

export default useTabs;
