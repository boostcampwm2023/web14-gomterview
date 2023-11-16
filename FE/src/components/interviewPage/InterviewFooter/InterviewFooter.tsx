import { css } from '@emotion/react';
import InterviewExitButton from './InterviewExitButton';
import AnswerToggleButton from './AnswerToggleButton';
import RecordControlButton from './RecordControlButton';
import NextButton from './NextButton';
import InterviewExitModal from '@components/interviewPage/InterviewModal/InterviewExitModal';
import { useState } from 'react';
import { theme } from '@styles/theme';

type InterviewFooterProps = {
  isRecording: boolean;
  recordedBlobs: Blob[];
  handleStartRecording: () => void;
  handleStopRecording: () => void;
  handleScript: () => void;
  handleDownload: () => void;
};

const InterviewFooter: React.FC<InterviewFooterProps> = ({
  isRecording,
  recordedBlobs,
  handleStartRecording,
  handleStopRecording,
  handleScript,
  handleDownload,
}) => {
  const [interviewExitModalIsOpen, setInterviewExitModalIsOpen] =
    useState<boolean>(false);

  const handleNext = () => {
    alert('다음면접을 진행합니다');
    if (!isRecording && recordedBlobs.length > 0) handleDownload();
    else alert('저장할 수 없습니다');
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
      <RecordControlButton
        isRecording={isRecording}
        handleStartRecording={handleStartRecording}
        handleStopRecording={handleStopRecording}
      />
      <NextButton handleNext={handleNext} />
      <InterviewExitModal
        isOpen={interviewExitModalIsOpen}
        closeModal={() => setInterviewExitModalIsOpen((prev) => !prev)}
      />
    </div>
  );
};
export default InterviewFooter;
