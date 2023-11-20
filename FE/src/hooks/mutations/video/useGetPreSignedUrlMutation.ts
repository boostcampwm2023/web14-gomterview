import { QUERY_KEY } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postPreSignedUrl } from '@/apis/video';
import { VideoPreSignedReqDto } from '@/types/video';

const useGetPreSignedUrlMutation = (body: VideoPreSignedReqDto) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => postPreSignedUrl(body),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.VIDEO,
      });
    },
  });
};

export default useGetPreSignedUrlMutation;
