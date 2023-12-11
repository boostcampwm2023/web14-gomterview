import { SelectedQuestion } from '@/atoms/interviewSetting';
import React, { MutableRefObject } from 'react';
import { toast } from '@foundation/Toast/toast';

type StartRecordingProps = {
  media: MediaStream | null;
  selectedMimeType: string;
  mediaRecorderRef: MutableRefObject<MediaRecorder | null>;
  setRecordedBlobs: React.Dispatch<React.SetStateAction<Blob[]>>;
};

export const startRecording = ({
  media,
  selectedMimeType,
  mediaRecorderRef,
  setRecordedBlobs,
}: StartRecordingProps) => {
  if (!media) {
    toast.error('미디어 스트림이 연결되지 않았습니다.');
    return;
  }

  try {
    mediaRecorderRef.current = new MediaRecorder(media, {
      mimeType: selectedMimeType,
      videoBitsPerSecond: 300000,
    });

    mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
      if (event.data && event.data.size > 0) {
        setRecordedBlobs((prevBlobs) => [...prevBlobs, event.data]);
      }
    };

    mediaRecorderRef.current.start();
    toast.success('녹화를 시작합니다');
  } catch (error) {
    toast.error('미디어 레코딩 중 오류가 발생했습니다.');
  }
};

export const stopRecording = (
  mediaRecorderRef: React.MutableRefObject<MediaRecorder | null>
) => {
  if (mediaRecorderRef.current) {
    mediaRecorderRef.current.stop();
    toast.success('녹화를 종료합니다');
  }
};

export const localDownload = (
  blob: Blob,
  currentQuestion: SelectedQuestion
) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = `${currentQuestion.questionContent}.webm`;

  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
  toast.success('성공적으로 컴퓨터에 저장되었습니다.');
};
