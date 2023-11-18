import { getQuestion } from '@/apis/question';
import { QUERY_KEY } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

const useQuestionCategoryQuery = ({
  categoryId,
  enabled,
}: {
  categoryId: number;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: QUERY_KEY.QUESTION_CATEGORY(categoryId),
    queryFn: () => getQuestion(categoryId),
    enabled,
  });
};

export default useQuestionCategoryQuery;
