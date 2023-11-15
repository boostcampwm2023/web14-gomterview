import InterviewPageLayout from '@components/interviewPage/InterviewPageLayout';
import InterviewHeader from '@/components/interviewPage/InterviewHeader/InterviewHeader';
import InterviewMain from '@/components/interviewPage/InterviewMain/InterviewMain';
import InterviewFooter from '@/components/interviewPage/InterviewFooter/InterviewFooter';
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import InterviewIntroModal from '@components/interviewPage/InterviewModal/InterviewIntroModal';
const InterviewPage: React.FC = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isScriptInView, setIsScriptInView] = useState(false);
  const [recordedBlobs, setRecordedBlobs] = useState<Blob[]>([]);
  const [selectedMimeType, setSelectedMimeType] = useState('');
  const [interviewIntroModalIsOpen, setInterviewIntroModalIsOpen] =
    useState<boolean>(true);

  const mirrorVideoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useLayoutEffect(() => {
    const mimeTypes = getSupportedMimeTypes();
    if (mimeTypes.length > 0) {
      setSelectedMimeType(mimeTypes[0]);
    }
  }, []);

  useEffect(() => {
    if (!stream) {
      void getMedia();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const getMedia = async () => {
    try {
      const constraints = {
        audio: {
          echoCancellation: { exact: true },
        },
        video: {
          width: 1280,
          height: 720,
        },
      };
      const mediaStream =
        await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      if (mirrorVideoRef.current) {
        mirrorVideoRef.current.srcObject = mediaStream;
      }
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
    } catch (e) {
      console.log(`MediaRecorder error`);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const handleDownload = () => {
    const blob = new Blob(recordedBlobs, { type: selectedMimeType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'recorded.webm';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
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

  return (
    <InterviewPageLayout>
      <InterviewHeader
        isRecording={isRecording}
        intervieweeName="가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하"
      />
      <InterviewMain
        mirrorVideoRef={mirrorVideoRef}
        isScriptInView={isScriptInView}
        question="이것은 예시 질문입니다."
        answer="이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!이것은 예시답변입니다!!!!"
      />
      <InterviewFooter
        isRecording={isRecording}
        recordedBlobs={recordedBlobs}
        handleStartRecording={handleStartRecording}
        handleStopRecording={handleStopRecording}
        handleScript={() => setIsScriptInView((prev) => !prev)}
        handleDownload={handleDownload}
      />
      <InterviewIntroModal
        isOpen={interviewIntroModalIsOpen}
        closeModal={() => setInterviewIntroModalIsOpen((prev) => !prev)}
      />
    </InterviewPageLayout>
  );
};

export default InterviewPage;
