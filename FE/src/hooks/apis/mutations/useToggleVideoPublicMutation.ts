import { QUERY_KEY } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchVideoPublic } from '@/apis/video';

const useToggleVideoPublicMutation = (videoId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => patchVideoPublic(videoId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.VIDEO_ID(videoId),
      });
    },
  });
};

export default useToggleVideoPublicMutation;
