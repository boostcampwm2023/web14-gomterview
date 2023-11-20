import { SyntheticEvent } from 'react';
import { css } from '@emotion/react';
import Tab from '@foundation/Tabs/Tab';
import enhanceChildElement from '@/utils/enhanceChildElement';
import { HTMLElementTypes } from '@/types/utils';

type TabListProps = {
  children: React.ReactNode;
  name?: string;
  direction?: 'row' | 'column';
  gap?: string;
  onTabChange: (e: SyntheticEvent, value: string) => void;
} & HTMLElementTypes<HTMLDivElement>;

const TabList: React.FC<TabListProps> = ({
  children,
  direction = 'row',
  gap = '0.5rem',
  onTabChange,
  ...args
}) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: ${direction};
        gap: ${gap};
      `}
      {...args}
    >
      {enhanceChildElement({
        children,
        component: Tab,
        newProps: { onTabChange: onTabChange },
      })}
    </div>
  );
};

export default TabList;
