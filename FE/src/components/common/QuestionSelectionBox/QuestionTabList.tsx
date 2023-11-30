import { theme } from '@styles/theme';
import {
  Button,
  Icon,
  SelectionBox,
  Tabs,
  Typography,
} from '@foundation/index';
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
        display: flex;
        flex-direction: column;
        flex: 1 1 22rem;
        row-gap: 1rem;
        padding-top: 1.5rem;
        border-radius: 1rem 0 0 1rem;
        background-color: ${theme.colors.surface.default};
        overflow-y: auto;
      `}
      onTabChange={onTabChange}
    >
      <Button
        size="md"
        variants="secondary"
        css={css`
          display: flex;
          align-items: center;
          column-gap: 0.5rem;
          align-self: center;
          border-radius: 2rem;
          margin-bottom: 1rem;
        `}
      >
        <Icon id="plus" width="1.5rem" height="1.5rem" />
        <Typography variant="body1" color={theme.colors.text.subStrong}>
          새 면접세트 추가
        </Typography>
      </Button>
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
