import { getQuestion } from '@/apis/question';
import { QUERY_KEY } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

/**
 * GET /question/${workbookId}
 *
 * workbookId로 해당 문제집의 질문과 디폴트 답안을 조회허는 api입니다.
 *
 * QuestionSelectionBox, 문제집 상세보기 페이지 등에서 사용됩니다.
 */
const useQuestionWorkbookQuery = ({
  workbookId,
  enabled,
}: {
  workbookId: number;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: QUERY_KEY.QUESTION_WORKBOOK(workbookId),
    queryFn: () => getQuestion(workbookId),
    enabled,
  });
};

export default useQuestionWorkbookQuery;
