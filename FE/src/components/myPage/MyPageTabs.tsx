import { css } from '@emotion/react';
import Tabs from '@foundation/Tabs';
import { Box, SelectionBox, Typography } from '@foundation/index';
import { useState, SyntheticEvent } from 'react';
import QuestionSelectTabPanel from './TabPanel/QuestionSelectTabPanel';
import VideoListTabPanel from './TabPanel/VideoListTabPanel';

const MyPageTabs: React.FC = () => {
  const [value, setValue] = useState('2');

  const handleTabChange = (_: SyntheticEvent, v: string) => {
    setValue(v);
  };

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
        <Tabs.TabList name="my-page" gap="1rem" onTabChange={handleTabChange}>
          <Tabs.Tab value="1">
            <SelectionBox
              id="add-question"
              name="my-page"
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
              name="my-page"
              lineDirection="bottom"
              defaultChecked
              css={css`
                padding: 1rem 0;
              `}
            >
              <Typography variant="title4">영상 다시보기</Typography>
            </SelectionBox>
          </Tabs.Tab>
        </Tabs.TabList>
      </Box>
      <Tabs.TabPanel value="1">
        <QuestionSelectTabPanel />
      </Tabs.TabPanel>
      <Tabs.TabPanel value="2">
        <VideoListTabPanel />
      </Tabs.TabPanel>
    </Tabs>
  );
};

export default MyPageTabs;
