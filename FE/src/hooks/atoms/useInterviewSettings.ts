import { useRecoilState } from 'recoil';
import {
  questionSetting,
  videoSetting,
  recordSetting,
} from '@atoms/interviewSetting';

function useInterviewSettings() {
  const [{ isSuccess: questionSuccess }, setQuestion] =
    useRecoilState(questionSetting);
  const [{ isSuccess: videoSuccess }, setVideo] = useRecoilState(videoSetting);
  const [{ isSuccess: recordSuccess }, setRecord] =
    useRecoilState(recordSetting);

  const isAllSuccess = questionSuccess && videoSuccess && recordSuccess;

  const resetAllSettings = () => {
    setQuestion({ isSuccess: false, selectedData: [] });
    setVideo({ isSuccess: false });
    setRecord({ isSuccess: false, method: undefined });
  };

  return {
    isAllSuccess,
    resetAllSettings,
  };
}

export default useInterviewSettings;
