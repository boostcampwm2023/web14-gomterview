import { WorkbookList, WorkbookPageLayout } from '@components/workbookPage';
import { css } from '@emotion/react';
import { Box, SelectionBox, Typography } from '@foundation/index';
import { ResponsiveMenu } from '@common/index';
import { Tabs } from '@foundation/index';
import useCategoryQuery from '@hooks/apis/queries/useCategoryQuery';
import { SyntheticEvent, useState } from 'react';
import useBreakpoint from '@hooks/useBreakPoint';

const WorkbookPage: React.FC = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState('0');
  const { data: categories } = useCategoryQuery();

  const isDeviceBreakpoint = useBreakpoint();

  const handleTabChange = (_: SyntheticEvent, v: string) => {
    setSelectedTabIndex(v);
  };

  return (
    <WorkbookPageLayout>
      <Typography variant="title1">면접 Set 목록</Typography>
      <Tabs initialValue="0">
        <ResponsiveMenu
          css={css`
            margin-bottom: 1.25rem;
          `}
        >
          <Box
            css={css`
              display: flex;
              align-items: center;
              padding: ${isDeviceBreakpoint('laptop') ? '0rem' : '0.5rem'} 0rem;
            `}
          >
            <Tabs.TabList
              name="my-page"
              gap="1rem"
              css={css`
                display: ${isDeviceBreakpoint('laptop') ? 'flex' : 'block'};
              `}
              onTabChange={handleTabChange}
            >
              {categories?.map((category, index) => (
                <Tabs.Tab value={index.toString()} key={category.id}>
                  <SelectionBox
                    id={`category-${category.id.toString()}`}
                    name="category-list"
                    lineDirection={
                      isDeviceBreakpoint('laptop') ? 'bottom' : 'left'
                    }
                    defaultChecked={index === 0}
                    css={css`
                      padding: 0.5rem 1rem;
                    `}
                  >
                    <Typography variant="title4">{category.name}</Typography>
                  </SelectionBox>
                </Tabs.Tab>
              ))}
            </Tabs.TabList>
          </Box>
        </ResponsiveMenu>
      </Tabs>
      <WorkbookList selectedTabIndex={selectedTabIndex} />
    </WorkbookPageLayout>
  );
};

export default WorkbookPage;
