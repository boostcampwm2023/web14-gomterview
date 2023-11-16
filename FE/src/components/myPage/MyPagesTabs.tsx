import { useState } from 'react';
import Tabs from '@foundation/Tabs';
import SelectionBox from '@foundation/SelectionBox/SelectionBox';
import { css } from '@emotion/react';
import Box from '@foundation/Box/Box';
import Typography from '@foundation/Typography/Typography';
import VideoListTabPanel from '@components/myPage/TabPanel/VideoListTabPanel';

const MyPagesTabs: React.FC = () => {
  const [value, setValue] = useState('2');
  return (
    <Tabs
      initialValue={value}
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
        <Box
          css={css`
            padding: 3rem;
          `}
        >
          질문 추가 모달
        </Box>
      </Tabs.TabPanel>
      <Tabs.TabPanel value="2">
        <VideoListTabPanel />
      </Tabs.TabPanel>
    </Tabs>
  );
};

export default MyPagesTabs;
