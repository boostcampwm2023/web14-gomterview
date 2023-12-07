import {
  CategoryMenu,
  WorkbookList,
  WorkbookPageLayout,
  WorkbookPlusButton,
} from '@components/workbookPage';
import { css } from '@emotion/react';

import { Typography } from '@foundation/index';

import { useState } from 'react';

const WorkbookPage: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  const handleTabChange = (v: string) => {
    setSelectedCategoryId(v);
  };

  return (
    <WorkbookPageLayout>
      <Typography
        variant="title1"
        css={css`
          margin: 0 0.5rem;
        `}
      >
        면접 세트 목록
      </Typography>
      <CategoryMenu onTabChange={handleTabChange} />
      <WorkbookList selectedCategoryId={selectedCategoryId} />
      <WorkbookPlusButton />
    </WorkbookPageLayout>
  );
};

export default WorkbookPage;
