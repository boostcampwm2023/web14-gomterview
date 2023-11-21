import React, { useState, useRef, useEffect } from 'react';

import InterviewPageLayout from '@components/interviewPage/InterviewPageLayout';
import InterviewHeader from '@/components/interviewPage/InterviewHeader/InterviewHeader';
import InterviewMain from '@/components/interviewPage/InterviewMain/InterviewMain';
import InterviewFooter from '@/components/interviewPage/InterviewFooter/InterviewFooter';
import InterviewIntroModal from '@components/interviewPage/InterviewModal/InterviewIntroModal';
import InterviewTimeOverModal from '@components/interviewPage/InterviewModal/InterviewTimeOverModal';
import useInterviewFlow from '@hooks/pages/Interview/useInterviewFlow';
import useIsAllSuccess from '@hooks/pages/Interview/usIsAllSuccess';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import { PATH } from '@constants/path';
import { Navigate } from 'react-router-dom';

const InterviewPage: React.FC = () => {
  const isAllSuccess = useIsAllSuccess();
  const isLogin = useQueryClient().getQueryState(QUERY_KEY.MEMBER);
  const { currentQuestion, getNextQuestion, isLastQuestion } =
    useInterviewFlow();
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isScriptInView, setIsScriptInView] = useState(true);
  const [recordedBlobs, setRecordedBlobs] = useState<Blob[]>([]);
  const [selectedMimeType, setSelectedMimeType] = useState('');
  const [interviewIntroModalIsOpen, setInterviewIntroModalIsOpen] =
    useState<boolean>(true);

  const mirrorVideoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    if (!stream && isAllSuccess) {
      void getMedia();
    }
    const mimeTypes = getSupportedMimeTypes();
    if (mimeTypes.length > 0) setSelectedMimeType(mimeTypes[0]);

    return () => {
      if (stream) {
        // recoil 을 모두 초기화
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isAllSuccess, stream]);

  const getMedia = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: { exact: true },
        },
        video: {
          width: 1280,
          height: 720,
        },
      });

      setStream(mediaStream);
      if (mirrorVideoRef.current)
        mirrorVideoRef.current.srcObject = mediaStream;
    } catch (e) {
      console.log(`현재 마이크와 카메라가 연결되지 않았습니다`);
    }
  };

  const handleStartRecording = () => {
    try {
      mediaRecorderRef.current = new MediaRecorder(stream as MediaStream, {
        mimeType: selectedMimeType,
      });
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          setRecordedBlobs([event.data]);
        }
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
      // RecordStartingTime 을 초기화합니다.
      // pre-signed url을 받습니다.
    } catch (e) {
      console.log(`MediaRecorder error`);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    // RecordEndTime을 초기화합니다.
  };

  const handleDownload = () => {
    const blob = new Blob(recordedBlobs, { type: selectedMimeType });
    if (isLogin) {
      // login 관련 api 처리를 수행합니다.
    } else {
      // 비회원의 경우 수행할 과정입니다.
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${currentQuestion.questionContent}.webm`;

      document.body.appendChild(a);
      a.click();

      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);
    }

    setRecordedBlobs([]);
  };

  const getSupportedMimeTypes = () => {
    const types = [
      'video/webm; codecs=vp8',
      'video/webm; codecs=vp9',
      'video/webm; codecs=h264',
      'video/mp4; codecs=h264',
    ];
    return types.filter((type) => MediaRecorder.isTypeSupported(type));
  };

  if (!isAllSuccess) return <Navigate to={PATH.ROOT} />;

  return (
    <InterviewPageLayout>
      <InterviewHeader
        isRecording={isRecording}
        intervieweeName="가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하"
      />
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
        isOpen={false}
        closeModal={() => console.log('모달을 종료합니다.')}
      />
    </InterviewPageLayout>
  );
};

export default InterviewPage;
