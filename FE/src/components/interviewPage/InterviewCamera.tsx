import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { css } from '@emotion/react';

const InterviewCamera: React.FC = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recording, setRecording] = useState(false);
  const [recordedBlobs, setRecordedBlobs] = useState<Blob[]>([]);
  const [selectedMimeType, setSelectedMimeType] = useState('');

  const gumVideoRef = useRef<HTMLVideoElement>(null);
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
      if (gumVideoRef.current) {
        gumVideoRef.current.srcObject = mediaStream;
      }
    } catch (e) {
      console.log(`현재 마이크와 카메라가 연결되지 않았습니다`);
    }
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
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 75%;
        border: 0.0625rem solid red;
      `}
    >
      면접페이지의 카메라 입니다.
    </div>
  );
};
export default InterviewCamera;
