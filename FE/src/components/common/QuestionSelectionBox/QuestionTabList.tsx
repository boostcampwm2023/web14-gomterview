import { SelectionBox, Tabs, Typography } from '@foundation/index';
import { WorkbookTitleListResDto } from '@/types/workbook';
import { SyntheticEvent } from 'react';
import { css } from '@emotion/react';
import { truncateText } from '@/utils/textUtils';

type QuestionTabListProps = {
  workbookListData: WorkbookTitleListResDto;
  onTabChange: (e: SyntheticEvent, value: string) => void;
};
const QuestionTabList: React.FC<QuestionTabListProps> = ({
  workbookListData,
  onTabChange,
}) => {
  return (
    <Tabs.TabList
      name="category"
      onTabChange={onTabChange}
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
      `}
    >
      {workbookListData.map((workbook, index) => (
        <Tabs.Tab value={index.toString()} key={workbook.workbookId}>
          <SelectionBox
            id={`workbook-${workbook.workbookId.toString()}`}
            name="workbook"
            defaultChecked={index === 0}
          >
            <Typography variant="title4">
              {truncateText(workbook.title, 12)}
            </Typography>
          </SelectionBox>
        </Tabs.Tab>
      ))}
    </Tabs.TabList>
  );
};

export default QuestionTabList;
