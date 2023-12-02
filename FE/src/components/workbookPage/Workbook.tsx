import { WorkbookCardProps } from '@common/WorkbookCard/WorkbookCard';
import { WorkbookCard } from '@common/index';
import { PATH } from '@constants/path';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

type WorkbookProps = WorkbookCardProps & { workbookId: number };

const Workbook: React.FC<WorkbookProps> = (props) => {
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

export default Workbook;
