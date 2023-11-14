import { SyntheticEvent, useContext } from 'react';
import { TabContext } from '@foundation/Tabs/index';
import enhanceChildElement from '@/utils/enhanceChildElement';
import Tab from '@foundation/Tabs/Tab';

type TabListProps = {
  children: React.ReactNode;
  onChange: (e: SyntheticEvent, value: string) => void;
};

const TabList: React.FC<TabListProps> = ({ children }) => {
  const { handleTabChange } = useContext(TabContext);

  return (
    <div>
      {enhanceChildElement({
        children,
        component: Tab,
        newProps: { onClick: handleTabChange },
      })}
    </div>
  );
};

export default TabList;
