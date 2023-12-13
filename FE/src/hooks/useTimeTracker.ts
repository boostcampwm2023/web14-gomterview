import { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';

const TIME_OVER = 180000;

const useTimeTracker = () => {
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [isTimeOver, setIsTimeOver] = useState(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    setStartTime(dayjs());
    setIsTimeOver(false);
    const timer = setTimeout(() => {
      setIsTimeOver(true);
    }, TIME_OVER);
    setTimerId(timer);
  };

  const stopTimer = () => {
    setEndTime(dayjs());
    setIsTimeOver(false);
    if (timerId) {
      clearTimeout(timerId);
      setTimerId(null);
    }
  };

  useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timerId]);

  const calculateDuration = () => {
    if (!startTime || !endTime) {
      return '00:00';
    }

    const duration = dayjs(endTime).diff(startTime, 'second');
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return {
    startTimer,
    stopTimer,
    calculateDuration,
    isTimeOver,
    setIsTimeOver,
  };
};

export default useTimeTracker;
