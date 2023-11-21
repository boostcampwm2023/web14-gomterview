import { useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { questionSetting } from '@atoms/interviewSetting';

function useInterviewFlow() {
  const { selectedData } = useRecoilValue(questionSetting);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isLastQuestion = currentIndex === selectedData.length - 1;

  const getNextQuestion = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const nextIndex =
        prevIndex + 1 < selectedData.length ? prevIndex + 1 : prevIndex;
      return nextIndex;
    });
  }, [selectedData]);

  const currentQuestion = selectedData[currentIndex];

  return { currentQuestion, getNextQuestion, isLastQuestion };
}

export default useInterviewFlow;
