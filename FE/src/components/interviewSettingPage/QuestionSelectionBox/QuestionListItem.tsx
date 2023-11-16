import { questionSetting } from '@/atoms/interviewSetting';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@/components/foundation/Accordion';
import { LeadingDot } from '@/components/foundation/LeadingDot/LeadingDot';
import Typography from '@/components/foundation/Typography/Typography';
import { theme } from '@/styles/theme';
import { Question } from '@/types/question';
import { css } from '@emotion/react';
import { useRecoilState } from 'recoil';

type QuestionListItemProps = {
  question: Question;
  categoryId: number;
};

const selectedStyle = css`
  background-color: ${theme.colors.point.secondary.default};
  color: ${theme.colors.text.white};
`;

const QuestionListItem: React.FC<QuestionListItemProps> = ({
  question,
  categoryId,
}) => {
  const [selectedQuestions, setSelectedQuestions] =
    useRecoilState(questionSetting);

  const isSelected = selectedQuestions.selectedData.some(
    (item) =>
      item.questionId === question.questionId && item.categoryId === categoryId
  );

  const handleChange = () => {
    if (isSelected) {
      setSelectedQuestions((prevState) => ({
        status: 'success',
        selectedData: prevState.selectedData.filter(
          (item) => item.questionId !== question.questionId
        ),
      }));
    } else {
      setSelectedQuestions({
        status: 'success',
        selectedData: [
          ...selectedQuestions.selectedData,
          { ...question, categoryId: categoryId },
        ],
      });
    }
  };
  return (
    <Accordion
      onChange={handleChange}
      expanded={isSelected}
      css={css`
        margin-bottom: 1.2rem;
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
      <AccordionDetails>
        <LeadingDot>
          <Typography noWrap variant="body3">
            {question.answerContent}
          </Typography>
        </LeadingDot>
      </AccordionDetails>
    </Accordion>
  );
};

export default QuestionListItem;
