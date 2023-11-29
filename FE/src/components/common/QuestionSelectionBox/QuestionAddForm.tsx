import useInput from '@hooks/useInput';
import useQuestionAddMutation from '@hooks/useQuestionAdd';
import { css } from '@emotion/react';
import { Button, InputArea } from '@foundation/index';

type QuestionAddFormProps = {
  categoryId: number;
};

/**
 * @deprecated
 * 현재 사용하지 않는 컴포넌트 입니다.
 * 나만의 질문에서 사용했던 질문을 바로 추가하는 컴포넌트로 사용하고 있습니다.
 *
 */
const QuestionAddForm: React.FC<QuestionAddFormProps> = ({ categoryId }) => {
  const { addQuestion } = useQuestionAddMutation(categoryId, {
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
      categoryId,
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
