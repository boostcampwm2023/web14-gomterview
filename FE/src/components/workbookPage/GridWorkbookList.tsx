import { WorkbookListResDto } from '@/types/workbook';
import { css } from '@emotion/react';
import Workbook from './Workbook';

type GridWorkBookListProps = {
  workbookList: WorkbookListResDto;
};

const GridWorkbookList: React.FC<GridWorkBookListProps> = ({
  workbookList,
}) => {
  return (
    <div
      css={css`
        display: grid;
        align-items: start;
        column-gap: 20px;
        grid-template-columns: repeat(2, minmax(0px, 1fr));
      `}
    >
      <div
        css={css`
          display: grid;
          row-gap: 20px;
        `}
      >
        {workbookList.map(
          (workbook, index) =>
            index % 2 === 0 && (
              <Workbook
                key={workbook.workbookId}
                nickname={workbook.nickname}
                profileImg={workbook.profileImg}
                copyCount={workbook.copyCount}
                title={workbook.title}
                content={workbook.content}
                workbookId={workbook.workbookId}
              />
            )
        )}
      </div>
      <div
        css={css`
          display: grid;
          row-gap: 20px;
        `}
      >
        {workbookList.map(
          (workbook, index) =>
            index % 2 === 1 && (
              <Workbook
                key={workbook.workbookId}
                nickname={workbook.nickname}
                profileImg={workbook.profileImg}
                copyCount={workbook.copyCount}
                title={workbook.title}
                content={workbook.content}
                workbookId={workbook.workbookId}
              />
            )
        )}
      </div>
    </div>
  );
};

export default GridWorkbookList;
