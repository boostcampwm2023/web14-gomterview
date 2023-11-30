import { WorkbookCard } from '@common/index';
import { css } from '@emotion/react';
import useWorkbookListQuery from '@hooks/apis/queries/useWorkbookListQuery';
import useBreakpoint from '@hooks/useBreakPoint';
import { PATH } from '@constants/path';
import { useNavigate } from 'react-router-dom';
import { WorkbookListResDto } from '@/types/workbook';
import { WorkbookCardType } from '@common/WorkbookCard/WorkbookCard';

type WorkbookListType = {
  selectedTabIndex: string;
};

type GridWorkBookListType = {
  workbookList: WorkbookListResDto;
};

type WorkbookType = WorkbookCardType & { workbookId: number };

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

const GridWorkbookList: React.FC<GridWorkBookListType> = ({ workbookList }) => {
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
                key={index}
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
                key={index}
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

const Workbook: React.FC<WorkbookType> = (props) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(PATH.INTERVIEW_WORKBOOK_DETAIL(props.workbookId))}
    >
      <WorkbookCard
        nickname={props.nickname}
        profileImg={props.profileImg}
        copyCount={props.copyCount}
        title={props.title}
        content={props.content}
        css={css`
          cursor: pointer;
          transition: transform 0.3s ease;

          &:hover {
            transform: scale(1.05);
          }
        `}
      />
    </div>
  );
};
