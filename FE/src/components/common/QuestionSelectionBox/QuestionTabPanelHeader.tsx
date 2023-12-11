import { css } from '@emotion/react';
import { Button, Icon, Menu, MenuItem, Typography } from '@foundation/index';
import { theme } from '@styles/theme';
import { ExcludeArray } from '@/types/utils';
import { WorkbookTitleListResDto } from '@/types/workbook';
import { useState } from 'react';
import useModal from '@hooks/useModal';
import { WorkbookGeneratorModal } from '@common/index';
import useWorkbookDelete from '@hooks/useWorkbookDelete';
import { toast } from '@foundation/Toast/toast';
import useBreakpoint from '@hooks/useBreakPoint';

type QuestionTabPanelHeaderProps = {
  workbook: ExcludeArray<WorkbookTitleListResDto>;
  questionLength: number;
  onWorkbookDelete: () => void;
  onEditButtonClick: () => void;
};
const QuestionTabPanelHeader: React.FC<QuestionTabPanelHeaderProps> = ({
  workbook,
  questionLength,
  onWorkbookDelete,
  onEditButtonClick,
}) => {
  const isDeviceBreakpoint = useBreakpoint();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { deleteWorkbook } = useWorkbookDelete();
  const { openModal, closeModal } = useModal(() => {
    return (
      <WorkbookGeneratorModal
        workbookId={workbook.workbookId}
        closeModal={closeModal}
      />
    );
  });

  const handleWorkbookDeleteClick = () => {
    deleteWorkbook(workbook.workbookId);
    toast.success('성공적으로 문제집이 삭제되었습니다.');
    onWorkbookDelete();
  };

  return (
    <>
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
            align-items: center;
            flex-wrap: wrap;
            row-gap: 0.5rem;
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
              onClick={onEditButtonClick}
              visible={!isDeviceBreakpoint('mobile')}
              css={css`
                display: flex;
                align-items: center;
                padding-right: 1.25rem;
                column-gap: 0.25rem;
                border: none;
              `}
            >
              <Icon id="edit-outline" width="20" height="20" />
              면접 질문 수정
            </Button>
            <div
              css={css`
                position: relative;
              `}
            >
              <Button
                onClick={() => setIsMenuOpen((prev) => !prev)}
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
              <Menu open={isMenuOpen} closeMenu={() => setIsMenuOpen(false)}>
                <MenuItem
                  onClick={onEditButtonClick}
                  visible={isDeviceBreakpoint('mobile')}
                >
                  <Typography noWrap>면접 질문 수정</Typography>
                </MenuItem>
                <MenuItem onClick={openModal}>
                  <Typography noWrap>면접 세트 편집</Typography>
                </MenuItem>
                <MenuItem onClick={handleWorkbookDeleteClick}>
                  <Typography noWrap>면접 세트 삭제</Typography>
                </MenuItem>
              </Menu>
            </div>
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
