import { useState } from 'react';
import Tabs from '@foundation/Tabs';
import SelectionBox from '@foundation/SelectionBox/SelectionBox';
import { css } from '@emotion/react';
import Box from '@foundation/Box/Box';
import Typography from '@foundation/Typography/Typography';

const MyPagesTabs: React.FC = () => {
  const [value, setValue] = useState('1');
  return (
    <Tabs
      value={value}
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 1.5rem;
      `}
    >
      <Box
        css={css`
          display: flex;
          align-items: center;
          padding: 0.5rem 1.5rem;
        `}
      >
        <Tabs.TabList
          name="my-page"
          gap="1rem"
          onChange={(_, v) => setValue(v)}
        >
          <Tabs.Tab value="1">
            <SelectionBox
              id="add-question"
              lineDirection="bottom"
              css={css`
                padding: 1rem 0;
              `}
            >
              <Typography variant="title4">질문 추가</Typography>
            </SelectionBox>
          </Tabs.Tab>
          <Tabs.Tab value="2">
            <SelectionBox
              id="replay"
              lineDirection="bottom"
              css={css`
                padding: 1rem 0;
              `}
            >
              <Typography variant="title4">영상 다시보기</Typography>
            </SelectionBox>
          </Tabs.Tab>
        </Tabs.TabList>
      </Box>
      <Box
        css={css`
          padding: 3rem;
        `}
      >
        <Tabs.TabPanel value="1">질문 추가 모달</Tabs.TabPanel>
        <Tabs.TabPanel value="2">영상 리스트</Tabs.TabPanel>
      </Box>
    </Tabs>
  );
};

export default MyPagesTabs;
