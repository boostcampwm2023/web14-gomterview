import React, { useState, useRef } from 'react';

import InterviewPageLayout from '@components/interviewPage/InterviewPageLayout';
import InterviewHeader from '@/components/interviewPage/InterviewHeader/InterviewHeader';
import InterviewMain from '@/components/interviewPage/InterviewMain/InterviewMain';
import InterviewFooter from '@/components/interviewPage/InterviewFooter/InterviewFooter';
import InterviewIntroModal from '@components/interviewPage/InterviewModal/InterviewIntroModal';
import InterviewTimeOverModal from '@components/interviewPage/InterviewModal/InterviewTimeOverModal';
import useInterviewFlow from '@hooks/pages/Interview/useInterviewFlow';
import useIsAllSuccess from '@/hooks/pages/Interview/useIsAllSuccess';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import { PATH } from '@constants/path';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { recordSetting } from '@/atoms/interviewSetting';
import useMedia from '@/hooks/useMedia';

import { useNavigate } from 'react-router-dom';
const InterviewPage: React.FC = () => {
  const isAllSuccess = useIsAllSuccess();
  const { method } = useRecoilValue(recordSetting);

  const isLogin = useQueryClient().getQueryState(QUERY_KEY.MEMBER);
  const navigate = useNavigate();
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

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const handleStartRecording = () => {
    try {
      mediaRecorderRef.current = new MediaRecorder(media as MediaStream, {
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

    switch (method) {
      case 'idrive': {
        // mutate({
        //   questionId: currentQuestion.questionId,
        // });

        // console.log(curPreSignedUrl);

        break;
      }
      case 'local': {
        // 비회원의 경우 수행할 과정입니다.
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${currentQuestion.questionContent}.webm`;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        break;
      }
    }

    setRecordedBlobs([]);
  };

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
          isOpen={false}
          closeModal={() => console.log('모달을 종료합니다.')}
        />
      </InterviewPageLayout>
    );
};

export default InterviewPage;
