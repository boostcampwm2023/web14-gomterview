import { SelectedQuestion } from '@/atoms/interviewSetting';
import useGetPreSignedUrlMutation from '@/hooks/mutations/video/useGetPreSignedUrlMutation';
import axios from 'axios';

type UploadParams = {
  blob: Blob;
  currentQuestion: SelectedQuestion;
};

export const useUploadToIDrive = () => {
  const { mutateAsync: getPreSignedUrl } = useGetPreSignedUrlMutation();

  const uploadToIDrive = async ({
    blob,
    currentQuestion,
  }: UploadParams): Promise<void> => {
    try {
      const preSignedResponse = await getPreSignedUrl({
        questionId: currentQuestion.questionId,
      });
      // response를 받습니다
      console.log(preSignedResponse);
      console.log(blob);
      await axios.put(preSignedResponse?.preSignedUrl, blob, {
        headers: { 'Content-Type': 'video/webm; codecs=vp8' },
      });

      // 추가적인 로직은 아직 구현되지 않았습니다.
    } catch (error) {
      console.error('업로드 중 오류 발생:', error);
      throw error; // 오류를 다시 throw하여 호출자에게 전파
    }
  };

  return uploadToIDrive;
};
