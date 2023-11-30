import { theme } from '@styles/theme';
import { css } from '@emotion/react';
import TabPanelItem from './QuestionTabPanelItem';
import { useRecoilState } from 'recoil';
import { QuestionAnswerSelectionModal } from '@atoms/modal';
import AnswerSelectionModal from './AnswerSelectionModal/AnswerSelectionModal';
import { Box, Button, Icon, Tabs, Typography } from '@foundation/index';
import useWorkbookTitleListQuery from '@hooks/apis/queries/useWorkbookTitleListQuery';
import { useState } from 'react';
import QuestionTabList from '@common/QuestionSelectionBox/QuestionTabList';
import InterviewSetGeneratorModal from '@common/QuestionSelectionBox/InterviewSetGeneratorModal/InterviewSetGeneratorModal';

const QuestionSelectionBox = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState('0');
  const { data: workbookListData } = useWorkbookTitleListQuery();

  const [
    { isOpen: isQuestionAnswerSelectionModalOpen, workbookId, question },
    setModalState,
  ] = useRecoilState(QuestionAnswerSelectionModal);

  const [
    isInterviewSetGeneratorModalOpen,
    setIsInterviewSetGeneratorModalOpen,
  ] = useState(false);

  if (!workbookListData) return;
  return (
    <>
      {workbookId && question && (
        <AnswerSelectionModal
          isOpen={isQuestionAnswerSelectionModalOpen}
          workbookId={workbookId}
          question={question}
          closeModal={() =>
            setModalState((pre) => ({
              ...pre,
              isOpen: false,
            }))
          }
        />
      )}
      <InterviewSetGeneratorModal
        isOpen={isInterviewSetGeneratorModalOpen}
        closeModal={() => setIsInterviewSetGeneratorModalOpen(false)}
      />
      <Box
        css={css`
          background-color: ${theme.colors.surface.inner};
          width: 100%;
          height: 30rem;
        `}
      >
        <Tabs
          initialValue={selectedTabIndex}
          css={css`
            display: flex;
            width: 100%;
            height: 100%;
            row-gap: 1.5rem;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: column;
              flex-basis: 12rem;
              row-gap: 2rem;
              padding-top: 1.5rem;
              border-radius: 1rem 0 0 1rem;
              background-color: ${theme.colors.surface.default};
              overflow-y: auto;
            `}
          >
            <Button
              size="md"
              variants="secondary"
              onClick={() =>
                setIsInterviewSetGeneratorModalOpen((prev) => !prev)
              }
              css={css`
                display: flex;
                align-items: center;
                column-gap: 0.5rem;
                align-self: center;
                border-radius: 2rem;
              `}
            >
              <Icon id="plus" width="1.5rem" height="1.5rem" />
              <Typography variant="body1" color={theme.colors.text.subStrong}>
                새 면접세트 추가
              </Typography>
            </Button>
            <QuestionTabList
              workbookListData={workbookListData}
              onTabChange={(_, value) => setSelectedTabIndex(value)}
            />
          </div>
          <div
            css={css`
              width: 100%;
              max-width: calc(100% - 12rem);
            `}
          >
            {workbookListData.map((workbook, index) => (
              <TabPanelItem
                selectedTabIndex={selectedTabIndex}
                tabIndex={index.toString()}
                workbook={workbook}
                key={workbook.workbookId}
              />
            ))}
          </div>
        </Tabs>
      </Box>
    </>
  );
};

export default QuestionSelectionBox;
