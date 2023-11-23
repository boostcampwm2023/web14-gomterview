import { QUERY_KEY } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postVideo } from '@/apis/video';

const useAddVideoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postVideo,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.VIDEO,
      });
    },
  });
};

export default useAddVideoMutation;
