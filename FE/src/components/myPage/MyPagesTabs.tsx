import { useState } from 'react';
import Tabs from '@foundation/Tabs';

const MyPagesTabs: React.FC = () => {
  const [value, setValue] = useState('1');
  return (
    <Tabs value={value}>
      <Tabs.TabList onChange={(_, v) => setValue(v)}>
        <Tabs.Tab label="질문 추가하기" value="1" />
        <Tabs.Tab label="영상 다시보기" value="2" />
      </Tabs.TabList>
      <Tabs.TabPanel value="1">질문 추가 모달</Tabs.TabPanel>
      <Tabs.TabPanel value="2">영상 리스트</Tabs.TabPanel>
    </Tabs>
  );
};

export default MyPagesTabs;
