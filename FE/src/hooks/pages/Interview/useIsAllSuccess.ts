import { useRecoilValue } from 'recoil';
import {
  questionSetting,
  videoSetting,
  recordSetting,
} from '@atoms/interviewSetting';

function useIsAllSuccess() {
  const { isSuccess: questionSuccess } = useRecoilValue(questionSetting);
  const { isSuccess: videoSuccess } = useRecoilValue(videoSetting);
  const { isSuccess: recordSuccess } = useRecoilValue(recordSetting);

  return questionSuccess && videoSuccess && recordSuccess;
}

export default useIsAllSuccess;
