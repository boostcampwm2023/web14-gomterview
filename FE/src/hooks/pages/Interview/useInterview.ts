import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { recordSetting } from '@/atoms/interviewSetting';
import { localDownload, startRecording, stopRecording } from '@/utils/record';
import { useUploadToIDrive } from '@/hooks/useUploadToIdrive';
import useTimeTracker from '@/hooks/useTimeTracker';
import useInterviewFlow from '@hooks/pages/Interview/useInterviewFlow';
import useInterviewSettings from '@/hooks/atoms/useInterviewSettings';
import useMedia from '@hooks/useMedia';

const useInterview = () => {
  const {
    startTimer,
    stopTimer,
    calculateDuration,
    isTimeOver,
    setIsTimeOver,
  } = useTimeTracker();
  const { isAllSuccess } = useInterviewSettings();
  const { method } = useRecoilValue(recordSetting);
  const uploadToDrive = useUploadToIDrive();
  const { currentQuestion, getNextQuestion, isLastQuestion } =
    useInterviewFlow();

  const {
    media,
    videoRef,
    connectStatus,
    selectedMimeType,
    startMedia,
    stopMedia,
    connectVideo,
  } = useMedia();

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

    switch (method) {
      case 'idrive':
        void uploadToDrive({ blob, currentQuestion, recordTime });
        break;
      case 'local':
        void localDownload(blob, currentQuestion, recordTime);
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
    if (isAllSuccess) connectVideo();
  }, [media, stopMedia, isAllSuccess, connectVideo]);

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
    reloadMedia: () => void startMedia(),
  };
};

export default useInterview;
