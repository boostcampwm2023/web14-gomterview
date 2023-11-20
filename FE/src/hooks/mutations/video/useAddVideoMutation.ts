import { QUERY_KEY } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addVideo } from '@/apis/video';
import { VideoAddReqDto } from '@/types/video';

const useAddVideoMutation = (body: VideoAddReqDto) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => addVideo(body),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.VIDEO,
      });
    },
  });
};

export default useAddVideoMutation;
