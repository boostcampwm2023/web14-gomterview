import { FC, MouseEventHandler, SyntheticEvent } from 'react';
import { css } from '@emotion/react';
import { QuestionItemStyles } from '@common/QuestionItem/QuestionItem.styles';
import Typography from '@foundation/Typography/Typography';
import { LeadingDot } from '@foundation/LeadingDot/LeadingDot';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@foundation/Accordion';
import { theme } from '@styles/theme';

type Props = {
  isSelected: boolean;
  isLogin: boolean;
  id: string;
  question: string;
  answer?: string;
  onChange: (event: SyntheticEvent, id: string) => void;
  onEditButtonClick: MouseEventHandler;
};
export const QuestionItem: FC<Props> = ({
  isSelected,
  isLogin,
  id,
  question,
  answer,
  onChange,
  onEditButtonClick,
}) => {
  const handleEditButtonClick: MouseEventHandler = (e) => {
    e.stopPropagation();
    onEditButtonClick(e);
  };

  return (
    <>
      <Accordion expanded={isSelected} onChange={(e) => onChange(e, id)}>
        <AccordionSummary
          defaultStyle={QuestionItemStyles.default}
          expandedStyle={QuestionItemStyles.expanded}
        >
          <Typography paragraph variant={'body1'}>
            {question}
          </Typography>
        </AccordionSummary>
        <AccordionDetails onClick={(e) => handleEditButtonClick(e)}>
          <LeadingDot>
            <Typography noWrap paragraph variant={'body1'}>
              {answer}
            </Typography>
          </LeadingDot>
          {isLogin && (
            <div
              css={css`
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0.5rem;
                border-radius: 3.125rem;
                background-color: ${theme.colors.surface.inner};
                cursor: pointer;

                &:hover {
                  background-color: #e5e5e5;
                }
              `}
            >
              <p>아</p>
            </div>
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
};
