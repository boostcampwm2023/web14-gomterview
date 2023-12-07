import useInput from '@hooks/useInput';
import useQuestionAdd from '@hooks/useQuestionAdd';
import { css } from '@emotion/react';
import { Button, Input } from '@foundation/index';
import { toast } from '@foundation/Toast/toast';
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
    useInput<HTMLInputElement>('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEmpty()) return;
    addQuestion({
      workbookId,
      value,
    });
    toast.success('성공적으로 질문이 추가되었습니다.');
  };

  return (
    <form
      css={css`
        display: flex;
        align-items: center;
        gap: 0.5rem;
      `}
      onSubmit={onSubmit}
    >
      <Input
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
