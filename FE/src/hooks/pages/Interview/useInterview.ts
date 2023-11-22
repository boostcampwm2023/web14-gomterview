import { useState, useRef, useCallback, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { recordSetting } from '@/atoms/interviewSetting';
import useMedia from '@/hooks/useMedia';
import { localDownload, startRecording, stopRecording } from '@/utils/record';
import { useUploadToIDrive } from '@/hooks/pages/Interview/useUploadToIdrive';
import useTimeTracker from '@/hooks/pages/Interview/useTimeTracker';
import useInterviewFlow from '@hooks/pages/Interview/useInterviewFlow';
import useIsAllSuccess from '@/hooks/pages/Interview/useIsAllSuccess';

const useInterview = () => {
  const {
    startTimer,
    stopTimer,
    calculateDuration,
    isTimeOver,
    setIsTimeOver,
  } = useTimeTracker();
  const isAllSuccess = useIsAllSuccess();
  const { method } = useRecoilValue(recordSetting);
  const uploadToDrive = useUploadToIDrive();
  const { currentQuestion, getNextQuestion, isLastQuestion } =
    useInterviewFlow();
  const { media, videoRef, connectStatus, selectedMimeType } = useMedia();
  const [isRecording, setIsRecording] = useState(false);
  const [isScriptInView, setIsScriptInView] = useState(true);
  const [recordedBlobs, setRecordedBlobs] = useState<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [timeOverModalIsOpen, setTimeOverModalIsOpen] =
    useState<boolean>(false);

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
    const recordTime = calculateDuration();
    console.log(recordTime);
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
    calculateDuration,
    method,
    uploadToDrive,
    currentQuestion,
  ]);

  useEffect(() => {
    if (isTimeOver) {
      handleStopRecording();
      setTimeOverModalIsOpen(true);
      setIsTimeOver(false);
    }
  }, [handleStopRecording, isTimeOver, setIsTimeOver]);

  return {
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
  };
};

export default useInterview;
