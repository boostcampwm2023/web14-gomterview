import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';

import { theme } from '@styles/theme';
import { Icon, Typography } from '@foundation/index';

interface RecordTimerProps {
  isRecording: boolean;
}

const RecordTimer: React.FC<RecordTimerProps> = ({ isRecording }) => {
  const [curTime, setCurTime] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRecording) {
      interval = setInterval(() => {
        setCurTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      setCurTime(0);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRecording]);

  return (
    <div
      css={css`
        display: flex;
        gap: 0.375rem;
        align-items: center;
      `}
    >
      <Icon id="timer" width="1.5rem" height="1.5rem" />
      <Typography
        noWrap
        paragraph
        variant={'body1'}
        color={theme.colors.text.white}
      >
        {formatTime(curTime)}
      </Typography>
    </div>
  );
};

export default RecordTimer;

const formatTime = (time: number): string => {
  const minutes: number = Math.floor(time / 60);
  const seconds: number = time % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
};
