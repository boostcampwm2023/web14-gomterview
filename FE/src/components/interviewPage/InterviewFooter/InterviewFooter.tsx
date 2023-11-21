import { css } from '@emotion/react';
import InterviewExitButton from './InterviewExitButton';
import AnswerToggleButton from './AnswerToggleButton';
import RecordControlButton from './RecordControlButton';
import NextButton from './NextButton';
import InterviewExitModal from '@components/interviewPage/InterviewModal/InterviewExitModal';
import { useState } from 'react';
import { theme } from '@styles/theme';
import InterviewFinishModal from '@components/interviewPage/InterviewModal/InterviewFinishModal';

type InterviewFooterProps = {
  isRecording: boolean;
  recordedBlobs: Blob[];
  isLastQuestion: boolean;
  handleStartRecording: () => void;
  handleStopRecording: () => void;
  handleScript: () => void;
  handleNextQuestion: () => void;
  handleDownload: () => void;
};

const InterviewFooter: React.FC<InterviewFooterProps> = ({
  isRecording,
  recordedBlobs,
  isLastQuestion,
  handleStartRecording,
  handleStopRecording,
  handleScript,
  handleNextQuestion,
  handleDownload,
}) => {
  const [interviewExitModalIsOpen, setInterviewExitModalIsOpen] =
    useState<boolean>(false);
  const [InterviewFinishModalIsOpen, setInterviewFinishModalIsOpen] =
    useState<boolean>(false);

  const handleNext = () => {
    handleDownload();
    if (!isLastQuestion) handleNextQuestion();
    else setInterviewFinishModalIsOpen(true);
  };

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 6.25rem;
        background-color: ${theme.colors.surface.black100};
        gap: 2.5rem;
      `}
    >
      <InterviewExitButton
        handleInterviewExit={() => setInterviewExitModalIsOpen(true)}
      />
      <AnswerToggleButton handleAnswerToggle={handleScript} />
      {recordedBlobs.length === 0 && (
        <RecordControlButton
          isRecording={isRecording}
          handleStartRecording={handleStartRecording}
          handleStopRecording={handleStopRecording}
        />
      )}
      {!isRecording && recordedBlobs.length > 0 && (
        <NextButton handleNext={handleNext} />
      )}
      <InterviewExitModal
        isOpen={interviewExitModalIsOpen}
        closeModal={() => setInterviewExitModalIsOpen((prev) => !prev)}
      />
      <InterviewFinishModal isOpen={InterviewFinishModalIsOpen} />
    </div>
  );
};
export default InterviewFooter;
