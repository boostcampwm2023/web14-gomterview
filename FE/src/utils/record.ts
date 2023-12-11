import { SelectedQuestion } from '@/atoms/interviewSetting';
import React, { MutableRefObject } from 'react';
import { toast } from '@foundation/Toast/toast';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';
const ffmpeg = new FFmpeg();

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

export const localDownload = async (
  blob: Blob,
  currentQuestion: SelectedQuestion,
  recordTime: string
) => {
  const mp4Blob = await EncodingWebmToMp4(blob, recordTime);
  const url = window.URL.createObjectURL(mp4Blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = `${currentQuestion.questionContent}.mp4`;

  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
  toast.success('성공적으로 컴퓨터에 저장되었습니다.');
};

export const EncodingWebmToMp4 = async (blob: Blob, recordTime: string) => {
  const baseURL = 'https://unpkg.com/@ffmpeg/core-mt@0.12.4/dist/umd';
  toast.info(
    '영상 인코딩을 시작합니다. 세로고침 혹은 화면을 종료시 데이터가 소실될 수 있습니다.'
  );

  let lastLogTime = 0;
  const logInterval = 10000; // 10초 간격 (밀리초 단위)

  ffmpeg.on('log', ({ message }) => {
    const currentTime = Date.now();

    if (currentTime - lastLogTime > logInterval) {
      lastLogTime = currentTime;
      const curProgressMessage = compareProgress(message, recordTime);
      if (curProgressMessage)
        toast.info(curProgressMessage, { autoClose: 5000 });
    }
  });

  if (!ffmpeg.loaded) {
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        'application/wasm'
      ),
      workerURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.worker.js`,
        'text/javascript'
      ),
    });
  }

  const arrayBuffer = await blob.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);
  // ffmpeg의 파일 시스템에 파일 작성
  await ffmpeg.writeFile('input.webm', uint8Array);

  await ffmpeg.exec(['-i', 'input.webm', 'output.mp4']);
  const data = await ffmpeg.readFile('output.mp4');
  const newBlob = new Blob([data], { type: 'video/mp4' });
  toast.info('성공적으로 Mp4 인코딩이 성공했습니다😊');

  return newBlob;
};