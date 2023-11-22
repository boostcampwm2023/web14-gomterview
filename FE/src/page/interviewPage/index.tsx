import React, { useState, useRef, useEffect, useCallback } from 'react';

import InterviewPageLayout from '@components/interviewPage/InterviewPageLayout';
import InterviewHeader from '@/components/interviewPage/InterviewHeader/InterviewHeader';
import InterviewMain from '@/components/interviewPage/InterviewMain/InterviewMain';
import InterviewFooter from '@/components/interviewPage/InterviewFooter/InterviewFooter';
import InterviewIntroModal from '@components/interviewPage/InterviewModal/InterviewIntroModal';
import InterviewTimeOverModal from '@components/interviewPage/InterviewModal/InterviewTimeOverModal';
import useInterviewFlow from '@hooks/pages/Interview/useInterviewFlow';
import useIsAllSuccess from '@/hooks/pages/Interview/useIsAllSuccess';
import { PATH } from '@constants/path';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { recordSetting } from '@/atoms/interviewSetting';
import useMedia from '@/hooks/useMedia';
import { localDownload, startRecording, stopRecording } from '@/utils/record';
import { useUploadToIDrive } from '@/hooks/pages/Interview/useUploadToIdrive';
import useTimeTracker from '@/hooks/pages/Interview/useTimeTracker';

const InterviewPage: React.FC = () => {
  const { startTimer, stopTimer, calculateDuration, isTimeOver } =
    useTimeTracker();
  const isAllSuccess = useIsAllSuccess();
  const { method } = useRecoilValue(recordSetting);
  const uploadToDrive = useUploadToIDrive();
  const { currentQuestion, getNextQuestion, isLastQuestion } =
    useInterviewFlow();

  const {
    media,
    videoRef: mirrorVideoRef,
    connectStatus,
    selectedMimeType,
  } = useMedia();

  const [isRecording, setIsRecording] = useState(false);
  const [isScriptInView, setIsScriptInView] = useState(true);
  const [recordedBlobs, setRecordedBlobs] = useState<Blob[]>([]);
  const [interviewIntroModalIsOpen, setInterviewIntroModalIsOpen] =
    useState<boolean>(true);
  const [interviewTimeOverModalIsOpen, setInterviewTimeOverModalIsOpen] =
    useState<boolean>(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const handleStartRecording = useCallback(() => {
    startRecording({
      media,
      selectedMimeType,
      mediaRecorderRef,
      setRecordedBlobs,
    });
    setIsRecording(true);
    startTimer();
  }, [media, selectedMimeType, mediaRecorderRef, setRecordedBlobs, startTimer]);

  const handleStopRecording = useCallback(() => {
    stopRecording(mediaRecorderRef);
    setIsRecording(false);
    stopTimer();
  }, [mediaRecorderRef, stopTimer]);

  const handleDownload = useCallback(() => {
    const blob = new Blob(recordedBlobs, { type: selectedMimeType });
    const recordingTime = calculateDuration();
    console.log(recordingTime);
    switch (method) {
      case 'idrive':
        void uploadToDrive({ blob, currentQuestion });
        break;
      case 'local':
        localDownload(blob, currentQuestion);
        break;
    }
    setRecordedBlobs([]);
  }, [
    recordedBlobs,
    selectedMimeType,
    method,
    currentQuestion,
    uploadToDrive,
    calculateDuration,
  ]);

  useEffect(() => {
    if (isTimeOver) {
      setInterviewTimeOverModalIsOpen(true);
      handleStopRecording();
    }
  }, [handleStopRecording, isTimeOver]);

  if (!isAllSuccess || connectStatus === 'fail') {
    return <Navigate to={PATH.ROOT} />;
  } else
    return (
      <InterviewPageLayout>
        <InterviewHeader isRecording={isRecording} intervieweeName="면접자" />
        <InterviewMain
          mirrorVideoRef={mirrorVideoRef}
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
          isOpen={interviewTimeOverModalIsOpen}
          closeModal={() => setInterviewTimeOverModalIsOpen(false)}
        />
      </InterviewPageLayout>
    );
};

export default InterviewPage;
