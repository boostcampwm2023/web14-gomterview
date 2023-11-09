import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { css } from '@emotion/react';

const InterviewCamera: React.FC = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recording, setRecording] = useState(false);
  const [recordedBlobs, setRecordedBlobs] = useState<Blob[]>([]);
  const [selectedMimeType, setSelectedMimeType] = useState('');

  const gumVideoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
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
