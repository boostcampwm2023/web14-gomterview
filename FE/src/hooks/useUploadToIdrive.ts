import { SelectedQuestion } from '@/atoms/interviewSetting';
import useGetPreSignedUrlMutation from '@/hooks/apis/mutations/useGetPreSignedUrlMutation';
import { putVideoToIdrive } from '@/apis/idrive';
import useAddVideoMutation from '@/hooks/apis/mutations/useAddVideoMutation';
import { toast } from '@foundation/Toast/toast';
import { EncodingWebmToMp4 } from '@/utils/record';

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
      const mp4Blob = await EncodingWebmToMp4(blob, recordTime);

      toast.success('성공적으로 서버에 업로드를 준비합니다.');
      const preSignedResponse = await getPreSignedUrl();
      // response를 받습니다

      await putVideoToIdrive({
        url: preSignedResponse?.preSignedUrl,
        blob: mp4Blob,
      });

      videoToServer({
        questionId: currentQuestion.questionId,
        videoName: currentQuestion.questionContent,
        url: `https://u2e0.c18.e2-4.dev/videos/${preSignedResponse.key}`,
        thumbnail: null,
        videoLength: recordTime,
      });
      toast.success('성공적으로 서버에 업로드 되었습니다😊');

      // 추가적인 로직은 아직 구현되지 않았습니다.
    } catch (error) {
      toast.error('업로드 중 오류 발생');
      throw error; // 오류를 다시 throw하여 호출자에게 전파
    }
  };

  return uploadToIDrive;
};
