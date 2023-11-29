import useInput from '@hooks/useInput';
import useQuestionAdd from '@hooks/useQuestionAdd';
import { css } from '@emotion/react';
import { Button, InputArea } from '@foundation/index';

type QuestionAddFormProps = {
  workbookId: number;
};

const QuestionAddForm: React.FC<QuestionAddFormProps> = ({ workbookId }) => {
  const { addQuestion } = useQuestionAdd(workbookId, {
    onSuccess: () => {
      clearInput();
    },
  });

  const { value, onChange, clearInput, isEmpty } =
    useInput<HTMLTextAreaElement>('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEmpty()) return;
    addQuestion({
      workbookId,
      value,
    });
  };

  return (
    <form
      css={css`
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 0.3rem;
      `}
      onSubmit={onSubmit}
    >
      <InputArea
        rows={1}
        css={css`
          padding: 0.5rem;
        `}
        value={value}
        onChange={onChange}
      />
      <Button
        size="md"
        css={css`
          flex: 1;
          white-space: nowrap;
        `}
        type="submit"
      >
        추가
      </Button>
    </form>
  );
};

export default QuestionAddForm;
