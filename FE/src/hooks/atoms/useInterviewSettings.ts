import { useRecoilState } from 'recoil';
import {
  questionSetting,
  videoSetting,
  recordSetting,
} from '@atoms/interviewSetting';
import { useCallback } from 'react';

function useInterviewSettings() {
  const [{ isSuccess: questionSuccess }, setQuestion] =
    useRecoilState(questionSetting);
  const [{ isSuccess: videoSuccess }, setVideo] = useRecoilState(videoSetting);
  const [{ isSuccess: recordSuccess }, setRecord] =
    useRecoilState(recordSetting);

  const isAllSuccess = questionSuccess && videoSuccess && recordSuccess;

  const resetAllSettings = useCallback(() => {
    setQuestion({ isSuccess: false, selectedData: [], from: undefined });
    setVideo({ isSuccess: false });
    setRecord({ isSuccess: false, method: undefined });
  }, [setQuestion, setRecord, setVideo]);

  return {
    isAllSuccess,
    resetAllSettings,
  };
}

export default useInterviewSettings;
