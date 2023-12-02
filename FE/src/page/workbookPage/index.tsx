import {
  CategoryMenu,
  WorkbookList,
  WorkbookPageLayout,
  WorkbookPlusButton,
} from '@components/workbookPage';
import { css } from '@emotion/react';

import { Typography } from '@foundation/index';

import { SyntheticEvent, useState } from 'react';

const WorkbookPage: React.FC = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState('0');

  const handleTabChange = (_: SyntheticEvent, v: string) => {
    setSelectedTabIndex(v);
  };

  return (
    <WorkbookPageLayout>
      <Typography
        variant="title1"
        css={css`
          margin: 0rem 0.5rem;
        `}
      >
        면접 세트 목록
      </Typography>
      <CategoryMenu handleTabChange={handleTabChange} />
      <WorkbookList selectedTabIndex={selectedTabIndex} />
      <WorkbookPlusButton />
    </WorkbookPageLayout>
  );
};

export default WorkbookPage;
