import { QUERY_KEY } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postVideo } from '@/apis/video';
import { VideoAddReqDto } from '@/types/video';

const useAddVideoMutation = (body: VideoAddReqDto) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => postVideo(body),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.VIDEO,
      });
    },
  });
};

export default useAddVideoMutation;
