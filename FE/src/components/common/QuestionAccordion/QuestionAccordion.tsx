import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@foundation/Accordion';
import Icon from '@foundation/Icon/Icon';
import Typography from '@foundation/Typography/Typography';
import { theme } from '@styles/theme';
import { Question } from '@/types/question';
import { css } from '@emotion/react';
import { LeadingDot } from '@foundation/index';
import useUserInfo from '@hooks/useUserInfo';
import useModal from '@hooks/useModal';
import AnswerSelectionModal from '@common/QuestionSelectionBox/AnswerSelectionModal/AnswerSelectionModal';

type QuestionAccordionProps = {
  question: Question;
  workbookId: number;
  isSelected: boolean;
  isEditable?: boolean;
  toggleSelected?: () => void;
};

const selectedStyle = css`
  background-color: ${theme.colors.point.secondary.default};
  color: ${theme.colors.text.white};
`;

const QuestionAccordion: React.FC<QuestionAccordionProps> = ({
  question,
  workbookId,
  isSelected,
  isEditable = true,
  toggleSelected,
}) => {
  const userInfo = useUserInfo();

  const { openModal, closeModal } = useModal(() => {
    return (
      workbookId &&
      question && (
        <AnswerSelectionModal
          workbookId={workbookId}
          question={question}
          closeModal={closeModal}
        />
      )
    );
  });

  const handleEditModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    openModal();
  };

  const handleEditGuestUser = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert('로그인 후 이용해 주세요');
  };

  return (
    <Accordion
      onChange={() => toggleSelected?.()}
      expanded={isSelected}
      css={css`
        width: 100%;
        min-width: calc(100% - 2rem);
      `}
    >
      <AccordionSummary
        css={[
          css`
            background-color: ${theme.colors.surface.default};
          `,
          isSelected && selectedStyle,
        ]}
      >
        <Typography noWrap variant="body3">
          {question.questionContent}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        css={css`
          justify-content: space-between;
        `}
      >
        <LeadingDot>
          <Typography
            noWrap
            variant="body3"
            css={css`
              min-width: 100%;
            `}
          >
            {question.answerContent}
          </Typography>
        </LeadingDot>
        {isEditable && (
          <Icon
            id="edit"
            css={css`
              flex-shrink: 0;
            `}
            width="2rem"
            height="2rem"
            onClick={userInfo ? handleEditModal : handleEditGuestUser}
          />
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default QuestionAccordion;
