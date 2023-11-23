import Box from '@foundation/Box/Box';
import Button from '@foundation/Button/Button';
import InputArea from '@foundation/InputArea/InputArea';
import Typography from '@foundation/Typography/Typography';
import useQuestionAnswerMutation from '@hooks/mutations/useQuestionAnswerMutation';
import useInput from '@hooks/useInput';
import { css } from '@emotion/react';

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
  const { mutate } = useQuestionAnswerMutation(questionId, {
    onSuccess: () => {
      void clearCustomAnswer();
    },
  });

  const handleCustomAnswerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isCustomAnswerEmpty()) return;
    mutate({
      questionId,
      content: customAnswer,
    });
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
