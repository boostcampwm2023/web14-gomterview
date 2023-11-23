import React, { useState } from 'react';

import InterviewPageLayout from '@components/interviewPage/InterviewPageLayout';
import InterviewHeader from '@/components/interviewPage/InterviewHeader/InterviewHeader';
import InterviewMain from '@/components/interviewPage/InterviewMain/InterviewMain';
import InterviewFooter from '@/components/interviewPage/InterviewFooter/InterviewFooter';
import InterviewIntroModal from '@components/interviewPage/InterviewModal/InterviewIntroModal';
import InterviewTimeOverModal from '@components/interviewPage/InterviewModal/InterviewTimeOverModal';

import { PATH } from '@constants/path';
import { Navigate } from 'react-router-dom';

import useInterview from '@/hooks/pages/Interview/useInterview';

const InterviewPage: React.FC = () => {
  const {
    isAllSuccess,
    connectStatus,
    isRecording,
    videoRef,
    isScriptInView,
    setIsScriptInView,
    recordedBlobs,
    currentQuestion,
    isLastQuestion,
    getNextQuestion,
    handleStartRecording,
    handleStopRecording,
    handleDownload,
    timeOverModalIsOpen,
    setTimeOverModalIsOpen,
  } = useInterview();

  const [interviewIntroModalIsOpen, setInterviewIntroModalIsOpen] =
    useState<boolean>(true);

  if (!isAllSuccess || connectStatus === 'fail') {
    return <Navigate to={PATH.ROOT} />;
  } else
    return (
      <InterviewPageLayout>
        <InterviewHeader isRecording={isRecording} />
        <InterviewMain
          mirrorVideoRef={videoRef}
          isScriptInView={isScriptInView}
          question={currentQuestion.questionContent}
          answer={currentQuestion.answerContent}
        />
        <InterviewFooter
          isRecording={isRecording}
          recordedBlobs={recordedBlobs}
          isLastQuestion={isLastQuestion}
          handleStartRecording={handleStartRecording}
          handleStopRecording={handleStopRecording}
          handleScript={() => setIsScriptInView((prev) => !prev)}
          handleNextQuestion={getNextQuestion}
          handleDownload={handleDownload}
        />
        <InterviewIntroModal
          isOpen={interviewIntroModalIsOpen}
          closeModal={() => setInterviewIntroModalIsOpen((prev) => !prev)}
        />
        <InterviewTimeOverModal
          isOpen={timeOverModalIsOpen}
          closeModal={() => setTimeOverModalIsOpen(false)}
        />
      </InterviewPageLayout>
    );
};

export default InterviewPage;
