import { css } from '@emotion/react';
import Modal from '@foundation/Modal';
import { Button, CheckBox, Icon, Typography } from '@foundation/index';
import useQuestionCopyMutation from '@hooks/apis/mutations/useQuestionCopyMutation';
import useWorkbookTitleListQuery from '@hooks/apis/queries/useWorkbookTitleListQuery';
import { useState } from 'react';

const AddWorkbookListModal = ({
  isOpen,
  closeModal,
  selectedQuestionIds,
}: {
  isOpen: boolean;
  closeModal: () => void;
  workbookId: number;
  selectedQuestionIds: number[];
}) => {
  const { data } = useWorkbookTitleListQuery();
  const { mutateAsync } = useQuestionCopyMutation();

  const [selectedWorkbook, setSelectedWorkbook] = useState<string[]>([]);

  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = e.target;
    if (checked) {
      setSelectedWorkbook((pre) => [...pre, id]);
    } else {
      setSelectedWorkbook((pre) => pre.filter((item) => item !== id));
    }
  };

  const mutateAllQuestionCopy = async () => {
    try {
      await Promise.all(
        selectedWorkbook.map((item) => {
          const workbookId = parseInt(item);
          return mutateAsync({
            workbookId: workbookId,
            questionIds: selectedQuestionIds,
          });
        })
      );
    } catch (error) {
      console.error('문제집 복사 중 오류 발생', error);
      throw error;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedWorkbook.length === 0) {
      alert('문제집을 선택해주세요.');
      return;
    }
    void mutateAllQuestionCopy();
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <form onSubmit={handleSubmit}>
        <ModalHeader />
        <Modal.content>
          <div
            css={css`
              width: 100%;
              > * {
                margin-bottom: 1rem;
              }
            `}
          >
            {data?.map((item) => (
              <CheckBox
                id={item.workbookId.toString()}
                key={item.workbookId}
                onInputChange={handleCheckBox}
              >
                <Typography
                  css={css`
                    margin-left: 1rem;
                  `}
                >
                  {item.title}
                </Typography>
              </CheckBox>
            ))}
            <NewWorkbookList />
          </div>
        </Modal.content>
        <Modal.footer>
          <div
            css={css`
              display: flex;
              justify-content: flex-end;
            `}
          >
            <Button type="submit">추가</Button>
          </div>
        </Modal.footer>
      </form>
    </Modal>
  );
};

export default AddWorkbookListModal;

const ModalHeader = () => {
  return (
    <div
      css={css`
        padding: 1rem 1rem 0 1rem;
      `}
    >
      <Typography variant="title4">문제집 추가</Typography>
    </div>
  );
};

const NewWorkbookList = () => {
  return (
    <button
      css={css`
        display: flex;
        align-items: center;
        width: 100%;

        outline: none;
        border: none;
        background-color: transparent;
        cursor: pointer;
      `}
      type="button"
    >
      <Icon id="plus" width="1.5rem" height="1.5rem" />
      <Typography
        css={css`
          margin-left: 1rem;
        `}
      >
        새로운 재생 목록 만들기
      </Typography>
    </button>
  );
};
