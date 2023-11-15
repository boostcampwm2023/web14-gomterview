import Box from '@/components/foundation/Box/Box';
import Button from '@/components/foundation/Button/Button';
import { theme } from '@/styles/theme';
import { css } from '@emotion/react';
import SelectionBox from '../../foundation/SelectionBox/SelectionBox';
import Typography from '@/components/foundation/Typography/Typography';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@/components/foundation/Accordion';
import { LeadingDot } from '@/components/foundation/LeadingDot/LeadingDot';

const QuestionSelectionBox = () => {
  return (
    <Box
      css={css`
        background-color: ${theme.colors.surface.inner};
        min-width: 46.875rem;
        display: flex;
        height: 40rem;
      `}
    >
      <div
        css={css`
          background-color: ${theme.colors.surface.default};
          width: 12rem;
          border-radius: 1rem 0 0 1rem;
          padding-top: 6rem;

          > * {
            margin-bottom: 1rem;
          }
        `}
      >
        <SelectionBox id="전체" name="group">
          <Typography variant="title4">전체</Typography>
        </SelectionBox>
        <SelectionBox id="FE" name="group">
          <Typography variant="title4">FE</Typography>
        </SelectionBox>
        <SelectionBox id="BE" name="group">
          <Typography variant="title4">BE</Typography>
        </SelectionBox>
        <SelectionBox id="my-page" name="group">
          <Typography variant="title4">나만의 질문</Typography>
        </SelectionBox>
      </div>

      <div
        css={css`
          position: relative;
          width: 100%;
          padding: 1rem;
        `}
      >
        <Typography variant="body3" color={theme.colors.text.subStrong}>
          13개의 질문
        </Typography>

        <Accordion onChange={() => {}} title="FE" expanded={true}>
          <AccordionSummary
            css={css`
              background-color: ${theme.colors.point.secondary.default};
              color: ${theme.colors.text.white};
            `}
          >
            FE
          </AccordionSummary>
          <AccordionDetails>
            <LeadingDot>BE</LeadingDot>
          </AccordionDetails>
        </Accordion>

        <Accordion onChange={() => {}} title="FE" expanded={true}>
          <AccordionSummary>FE</AccordionSummary>
          <AccordionDetails>BE</AccordionDetails>
        </Accordion>

        <div
          css={css`
            display: flex;
            justify-content: flex-end;
            position: absolute;
            bottom: 0;
            right: 0;
            padding: 1rem;
            width: 100%;
            background-color: ${theme.colors.surface.default};
          `}
        >
          <Button
            css={css`
              margin-left: auto;
            `}
            size="sm"
          >
            선택된 질문만 보기
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default QuestionSelectionBox;
