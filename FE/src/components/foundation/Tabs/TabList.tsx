import { SyntheticEvent, useContext } from 'react';
import { TabContext } from '@foundation/Tabs/index';
import enhanceChildElement from '@/utils/enhanceChildElement';
import Tab from '@foundation/Tabs/Tab';
import { css } from '@emotion/react';

type TabListProps = {
  children: React.ReactNode;
  name?: string;
  direction?: 'row' | 'column';
  gap?: string;
  onChange: (e: SyntheticEvent, value: string) => void;
};

const TabList: React.FC<TabListProps> = ({
  children,
  name,
  direction = 'row',
  gap = '0.5rem',
}) => {
  const { handleTabChange } = useContext(TabContext);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: ${direction};
        gap: ${gap};
      `}
    >
      {enhanceChildElement({
        children,
        component: Tab,
        newProps: { onClick: handleTabChange, name },
      })}
    </div>
  );
};

export default TabList;
