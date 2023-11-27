import { QUERY_KEY } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteVideoById } from '@/apis/video';

const useDeleteVideoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteVideoById,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.VIDEO,
      });
    },
  });
};

export default useDeleteVideoMutation;
