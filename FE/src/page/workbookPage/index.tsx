import {
  CategoryMenu,
  WorkbookList,
  WorkbookPageLayout,
} from '@components/workbookPage';
import { Typography } from '@foundation/index';
import { SyntheticEvent, useState } from 'react';

const WorkbookPage: React.FC = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState('0');

  const handleTabChange = (_: SyntheticEvent, v: string) => {
    setSelectedTabIndex(v);
  };

  return (
    <WorkbookPageLayout>
      <Typography variant="title1">면접 Set 목록</Typography>
      <CategoryMenu handleTabChange={handleTabChange} />
      <WorkbookList selectedTabIndex={selectedTabIndex} />
    </WorkbookPageLayout>
  );
};

export default WorkbookPage;
