import React, { useState } from 'react';

import { PATH } from '@constants/path';
import { Navigate } from 'react-router-dom';
import {
  InterviewHeader,
  InterviewMain,
  InterviewFooter,
  InterviewPageLayout,
} from '@components/interviewPage';
import {
  InterviewIntroModal,
  InterviewTimeOverModal,
} from '@components/interviewPage/InterviewModal';
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
    reloadMedia,
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
          connectStatus={connectStatus}
          reloadMedia={reloadMedia}
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
