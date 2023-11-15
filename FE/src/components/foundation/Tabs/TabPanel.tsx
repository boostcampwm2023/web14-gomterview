import { useContext } from 'react';
import { TabContext } from '@foundation/Tabs/index';
import { css } from '@emotion/react';

type TabPanelProps = {
  children: React.ReactNode;
  value: string;
};

const TabPanel: React.FC<TabPanelProps> = ({ children, value }) => {
  const { selectedValue } = useContext(TabContext);
  return (
    <div
      css={css`
        display: ${selectedValue === value ? 'block' : 'none'};
      `}
    >
      {children}
    </div>
  );
};

export default TabPanel;
