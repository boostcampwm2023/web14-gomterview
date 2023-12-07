import { css } from '@emotion/react';
import { Box, SelectionBox, Tabs, Typography } from '@foundation/index';
import QuestionSelectTabPanel from './TabPanel/QuestionSelectTabPanel';
import VideoListTabPanel from './TabPanel/VideoListTabPanel';

const MyPageTabs: React.FC = () => {
  return (
    <Tabs
      initialValue={'2'}
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
          column-gap: 1rem;
          padding: 0.5rem 1.5rem;
        `}
      >
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
            css={css`
              padding: 1rem 0;
            `}
          >
            <Typography variant="title4">영상 다시보기</Typography>
          </SelectionBox>
        </Tabs.Tab>
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
