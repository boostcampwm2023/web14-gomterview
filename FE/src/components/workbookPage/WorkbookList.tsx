import { css } from '@emotion/react';
import useWorkbookListQuery from '@hooks/apis/queries/useWorkbookListQuery';
import useBreakpoint from '@hooks/useBreakPoint';
import Workbook from './Workbook';
import GridWorkbookList from './GridWorkbookList';

type WorkbookListType = {
  selectedTabIndex: string;
};

const WorkbookList: React.FC<WorkbookListType> = ({ selectedTabIndex }) => {
  const isDeviceBreakpoint = useBreakpoint();
  const { data: workbookList } = useWorkbookListQuery(Number(selectedTabIndex));

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
        {workbookList.map((workbook, index) => (
          <Workbook
            key={index}
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
