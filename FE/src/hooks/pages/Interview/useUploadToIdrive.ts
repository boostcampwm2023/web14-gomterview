import { SelectedQuestion } from '@/atoms/interviewSetting';
import useGetPreSignedUrlMutation from '@/hooks/mutations/video/useGetPreSignedUrlMutation';
import { putVideoToIdrive } from '@/apis/idrive';
import useAddVideoMutation from '@hooks/mutations/video/useAddVideoMutation';

type UploadParams = {
  blob: Blob;
  currentQuestion: SelectedQuestion;
  recordTime: string;
};

export const useUploadToIDrive = () => {
  const { mutateAsync: getPreSignedUrl } = useGetPreSignedUrlMutation();
  const { mutate: videoToServer } = useAddVideoMutation();

  const uploadToIDrive = async ({
    blob,
    currentQuestion,
    recordTime,
  }: UploadParams): Promise<void> => {
    try {
      const preSignedResponse = await getPreSignedUrl({
        questionId: currentQuestion.questionId,
      });
      // response를 받습니다

      await putVideoToIdrive({
        url: preSignedResponse?.preSignedUrl,
        blob: blob,
      });

      videoToServer({
        questionId: currentQuestion.questionId,
        videoName: currentQuestion.questionContent,
        url: `https://u2e0.c18.e2-4.dev/videos/${preSignedResponse.key}`,
        thumbnail: null,
        videoLength: recordTime,
      });

      // 추가적인 로직은 아직 구현되지 않았습니다.
    } catch (error) {
      console.error('업로드 중 오류 발생:', error);
      throw error; // 오류를 다시 throw하여 호출자에게 전파
    }
  };

  return uploadToIDrive;
};
