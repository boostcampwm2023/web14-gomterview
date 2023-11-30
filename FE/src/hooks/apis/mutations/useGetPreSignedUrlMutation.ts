import { QUERY_KEY } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postPreSignedUrl } from '@/apis/video';

/**
 * POST /video/pre-signed
 *
 * 면접 비디오 등록용 pre-signed URL을 발급받기 위한 api입니다.
 */
const useGetPreSignedUrlMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postPreSignedUrl,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.VIDEO,
      });
    },
  });
};

export default useGetPreSignedUrlMutation;
