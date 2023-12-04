import { css } from '@emotion/react';
import { Button, Icon, Typography } from '@foundation/index';
import { theme } from '@styles/theme';
import { ExcludeArray } from '@/types/utils';
import { WorkbookTitleListResDto } from '@/types/workbook';
import InterviewSetGeneratorModal from '@common/QuestionSelectionBox/InterviewSetGeneratorModal/InterviewSetGeneratorModal';
import { useState } from 'react';

type QuestionTabPanelHeaderProps = {
  workbook: ExcludeArray<WorkbookTitleListResDto>;
  questionLength: number;
};
const QuestionTabPanelHeader: React.FC<QuestionTabPanelHeaderProps> = ({
  workbook,
  questionLength,
}) => {
  const [
    isInterviewSetGeneratorModalOpen,
    setIsInterviewSetGeneratorModalOpen,
  ] = useState(false);

  return (
    <>
      <InterviewSetGeneratorModal
        workbookId={workbook.workbookId}
        isOpen={isInterviewSetGeneratorModalOpen}
        closeModal={() => setIsInterviewSetGeneratorModalOpen(false)}
      />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          row-gap: 0.5rem;
          padding: 1rem;
        `}
      >
        <Typography variant="title4">{workbook.title}</Typography>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              column-gap: 0.5rem;
            `}
          >
            <Button
              variants="secondary"
              size="sm"
              onClick={() => setIsInterviewSetGeneratorModalOpen(true)}
              css={css`
                display: flex;
                align-items: center;
                padding-right: 1.25rem;
                column-gap: 0.25rem;
                border: none;
              `}
            >
              <Icon id="edit-outline" width="20" height="20" />
              면접 세트 수정
            </Button>
            <Button
              variants="secondary"
              size="sm"
              css={css`
                display: flex;
                align-items: center;
                padding: 0.5rem;
                border: none;
              `}
            >
              <Icon id="ellipsis-vertical" />
            </Button>
          </div>

          <Typography
            component="p"
            variant="body3"
            color={theme.colors.text.subStrong}
          >
            {questionLength}개의 질문
          </Typography>
        </div>
      </div>
    </>
  );
};

export default QuestionTabPanelHeader;
