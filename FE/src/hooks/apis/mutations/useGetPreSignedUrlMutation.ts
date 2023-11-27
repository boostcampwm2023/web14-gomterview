import { QUERY_KEY } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postPreSignedUrl } from '@/apis/video';

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
