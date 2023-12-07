import { SelectionBox, Tabs, Typography } from '@foundation/index';
import { WorkbookTitleListResDto } from '@/types/workbook';
import { css } from '@emotion/react';
import { truncateText } from '@/utils/textUtils';

type QuestionTabListProps = {
  workbookListData: WorkbookTitleListResDto;
};
const QuestionTabList: React.FC<QuestionTabListProps> = ({
  workbookListData,
}) => {
  return (
    <div
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
          >
            <Typography variant="title4">
              {truncateText(workbook.title, 12)}
            </Typography>
          </SelectionBox>
        </Tabs.Tab>
      ))}
    </div>
  );
};

export default QuestionTabList;
