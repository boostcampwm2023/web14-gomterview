import { css } from '@emotion/react';
import useWorkbookListQuery from '@hooks/apis/queries/useWorkbookListQuery';
import useBreakpoint from '@hooks/useBreakPoint';
import Workbook from './Workbook';
import GridWorkbookList from './GridWorkbookList';

type WorkbookListProps = {
  selectedTabIndex: string;
};

const WorkbookList: React.FC<WorkbookListProps> = ({ selectedTabIndex }) => {
  const isDeviceBreakpoint = useBreakpoint();
  const { data: workbookList } = useWorkbookListQuery(selectedTabIndex);

  if (!workbookList) {
    return;
  }

  if (isDeviceBreakpoint('tablet')) {
    return (
      <div
        css={css`
          display: grid;
          row-gap: 20px;
        `}
      >
        {workbookList.map((workbook) => (
          <Workbook
            key={workbook.workbookId}
            nickname={workbook.nickname}
            profileImg={workbook.profileImg}
            copyCount={workbook.copyCount}
            title={workbook.title}
            content={workbook.content}
            workbookId={workbook.workbookId}
          />
        ))}
      </div>
    );
  } else return <GridWorkbookList workbookList={workbookList} />;
};

export default WorkbookList;
