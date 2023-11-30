import { QUERY_KEY } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postVideo } from '@/apis/video';

/**
 * POST /video
 *
 * 새로운 비디오를 등록할 때 사용하는 api입니다.
 */
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
