import Box from '@/components/foundation/Box/Box';
import { theme } from '@/styles/theme';
import { css } from '@emotion/react';
import Typography from '@/components/foundation/Typography/Typography';

import Tabs from '@/components/foundation/Tabs';
import { useState } from 'react';
import SelectionBox from '@/components/foundation/SelectionBox/SelectionBox';
import TabPanelItem from './QuestionTabPanelItem';
import useCategoryQuery from '@/hooks/queries/useCategoryQuery';

const QuestionSelectionBox = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState('0');
  //TODO: 현재 선택된 값은 임의 값임 Tabs를 변경한다면 가장 먼저 수정해야 할 사안.
  // HOW: 해당 state는 몇번째 Tab을 클릭했는지 저장하는 state이다. 따라서 Index값을 가지고 있고 이를 바탕으로 questionAPI 데이터를 가져와야 한다.

  const { data: categoryData } = useCategoryQuery();
  return (
    <Box
      css={css`
        background-color: ${theme.colors.surface.inner};
        width: 100%;
        height: 40rem;
      `}
    >
      <Tabs
        initialValue={selectedTabIndex}
        css={css`
          display: flex;
          width: 100%;
          height: 100%;
          row-gap: 1.5rem;
        `}
      >
        <Tabs.TabList
          name="category"
          css={css`
            background-color: ${theme.colors.surface.default};
            width: 12rem;
            border-radius: 1rem 0 0 1rem;
            padding-top: 6rem;
            display: flex;
            flex-direction: column;
            > * {
              margin-bottom: 1rem;
            }
          `}
          onTabChange={(_, value) => setSelectedTabIndex(value)}
        >
          {categoryData?.map((category, index) => (
            <Tabs.Tab value={index.toString()} key={category.id}>
              <SelectionBox
                id={`category-${category.id.toString()}`}
                name="category"
                defaultChecked={index === 0}
              >
                <Typography variant="title4">{category.name}</Typography>
              </SelectionBox>
            </Tabs.Tab>
          ))}
        </Tabs.TabList>

        <div
          css={css`
            width: 100%;
            max-width: calc(100% - 12rem);
          `}
        >
          {categoryData?.map((category, index) => (
            <TabPanelItem
              selectedTabIndex={selectedTabIndex}
              tabIndex={index.toString()}
              category={category}
              key={category.id}
            />
          ))}
        </div>
      </Tabs>
    </Box>
  );
};

export default QuestionSelectionBox;
