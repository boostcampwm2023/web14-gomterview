import { theme } from '@styles/theme';
import { SelectionBox, Tabs, Typography } from '@foundation/index';
import { WorkbookTitleListResDto } from '@/types/workbook';
import { css } from '@emotion/react';
import { SyntheticEvent } from 'react';

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
      css={css`
        display: block;
        width: 12rem;
        padding-top: 1rem;
        border-radius: 1rem 0 0 1rem;
        background-color: ${theme.colors.surface.default};
        overflow-y: auto;
        > * {
          margin-bottom: 1rem;
        }
      `}
      onTabChange={onTabChange}
    >
      {workbookListData.map((workbook, index) => (
        <Tabs.Tab value={index.toString()} key={workbook.workbookId}>
          <SelectionBox
            id={`workbook-${workbook.workbookId.toString()}`}
            name="workbook"
            defaultChecked={index === 0}
          >
            <Typography variant="title4">{workbook.title}</Typography>
          </SelectionBox>
        </Tabs.Tab>
      ))}
    </Tabs.TabList>
  );
};

export default QuestionTabList;
