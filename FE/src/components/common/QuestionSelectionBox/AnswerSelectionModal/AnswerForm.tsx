import useQuestionAnswerMutation from '@/hooks/apis/mutations/useQuestionAnswerMutation';
import useInput from '@hooks/useInput';
import { css } from '@emotion/react';
import { Box, Button, InputArea, Typography } from '@foundation/index';
import { toast } from '@foundation/Toast/toast';

type AnswerFormProps = {
  questionId: number;
  question: string;
};

const AnswerForm: React.FC<AnswerFormProps> = ({ questionId, question }) => {
  const {
    value: customAnswer,
    onChange: handleCustomAnswerChange,
    isEmpty: isCustomAnswerEmpty,
    clearInput: clearCustomAnswer,
  } = useInput<HTMLTextAreaElement>('');
  const { mutate } = useQuestionAnswerMutation(questionId);

  const handleCustomAnswerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isCustomAnswerEmpty()) return;

    mutate(
      {
        questionId,
        content: customAnswer,
      },
      {
        onSuccess: () => {
          clearCustomAnswer();
          toast.success('답변 추가에 성공했습니다.', {
            position: 'bottomRight',
          });
        },
      }
    );
  };

  return (
    <form
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        margin-bottom: 1.5rem;
      `}
      onSubmit={handleCustomAnswerSubmit}
    >
      <Box
        css={css`
          padding: 1rem;
          margin-bottom: 1.5rem;
        `}
      >
        <Typography>{question}</Typography>
      </Box>

      <InputArea onChange={handleCustomAnswerChange} value={customAnswer} />
      <Button
        type="submit"
        size="sm"
        css={css`
          margin-top: 1rem;
          margin-left: auto;
        `}
      >
        답변 추가하기
      </Button>
    </form>
  );
};

export default AnswerForm;
