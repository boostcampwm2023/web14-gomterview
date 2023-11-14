import { useContext } from 'react';
import { TabContext } from '@foundation/Tabs/index';

type TabPanelProps = {
  children: React.ReactNode;
  value: string;
};

const TabPanel: React.FC<TabPanelProps> = ({ children, value }) => {
  const { selectedValue } = useContext(TabContext);
  return selectedValue === value ? <div>{children}</div> : null;
};

export default TabPanel;
