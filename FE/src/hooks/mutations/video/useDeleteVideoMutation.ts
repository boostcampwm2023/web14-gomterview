import { QUERY_KEY } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteVideoById } from '@/apis/video';

const useDeleteVideoMutation = (videoId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteVideoById(videoId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.VIDEO,
      });
    },
  });
};

export default useDeleteVideoMutation;
