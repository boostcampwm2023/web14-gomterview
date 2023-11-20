import { useContext } from 'react';
import { TabContext } from '@foundation/Tabs/index';
import { css } from '@emotion/react';
import { HTMLElementTypes } from '@/types/utils';

type TabPanelProps = {
  children: React.ReactNode;
  value: string;
} & HTMLElementTypes<HTMLDivElement>;

const TabPanel: React.FC<TabPanelProps> = ({ children, value, ...args }) => {
  const { selectedValue } = useContext(TabContext);
  return (
    <div
      css={css`
        display: ${selectedValue === value ? 'block' : 'none'};
      `}
      {...args}
    >
      {children}
    </div>
  );
};

export default TabPanel;
