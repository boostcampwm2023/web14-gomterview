import { HTMLElementTypes } from '@/types/utils';
import useTabs from '@foundation/Tabs2/useTabs';

type TabPanelProps = {
  children: React.ReactNode;
  value: string;
} & HTMLElementTypes<HTMLDivElement>;

const TabPanel2: React.FC<TabPanelProps> = ({ children, value, ...args }) => {
  const { currentValue } = useTabs();

  if (currentValue !== value) return null;
  return <div {...args}>{children}</div>;
};

export default TabPanel2;
