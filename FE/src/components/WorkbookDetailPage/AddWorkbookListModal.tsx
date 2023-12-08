import { WorkbookEntity } from '@/types/workbook';
import { css } from '@emotion/react';
import Modal from '@foundation/Modal';
import { Button, CheckBox, Typography } from '@foundation/index';
import useQuestionCopyMutation from '@hooks/apis/mutations/useQuestionCopyMutation';
import useWorkbookTitleListQuery from '@hooks/apis/queries/useWorkbookTitleListQuery';
import { useState } from 'react';
import NewWorkbookListButton from './NewWorkbookListButton';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@constants/path';
import { toast } from '@foundation/Toast/toast';

const AddWorkbookListModal = ({
  closeModal,
  selectedQuestionIds,
  workbookData,
}: {
  closeModal: () => void;
  selectedQuestionIds: number[];
  workbookData: WorkbookEntity;
}) => {
  const navigate = useNavigate();
  const { data: workbookTitleData } = useWorkbookTitleListQuery();
  const { mutateAsync } = useQuestionCopyMutation();

  const [selectedWorkbook, setSelectedWorkbook] = useState<string[]>([]);

  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = e.target;
    checked ? selectWorkBook(id) : unSelectWorkBook(id);
  };

  const selectWorkBook = (id: string) =>
    setSelectedWorkbook((pre) => [...pre, id]);

  const unSelectWorkBook = (id: string) =>
    setSelectedWorkbook((pre) => pre.filter((item) => item !== id));

  const mutateAllQuestionCopy = async () => {
    await Promise.all(
      selectedWorkbook.map((item) => {
        const workbookId = parseInt(item);

        return mutateAsync({
          workbookId: workbookId,
          questionIds: selectedQuestionIds,
        });
      })
    );
    toast.success('모든 질문들이 복사되었습니다.');
    toast.success('마이페이지에서 확인하실 수 있습니다');
  };

  const handleNavigate = () => {
    closeModal();
    navigate(PATH.MYPAGE, { state: { tabIndex: '1' } });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedWorkbook.length === 0) {
      alert('문제집을 선택해주세요.');
      return;
    }

    try {
      void mutateAllQuestionCopy();
      handleNavigate();
    } catch (error) {
      console.error('문제집 복사 중 오류 발생', error);

      throw error;
    }
  };

  return (
    <Modal isOpen={true} closeModal={closeModal}>
      <form onSubmit={handleSubmit}>
        <ModalHeader />
        <Modal.content>
          <div
            css={css`
              width: 100%;
              gap: 1rem;
            `}
          >
            {workbookTitleData?.map((item) => (
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
            <NewWorkbookListButton
              selectedQuestionIds={selectedQuestionIds}
              workbookData={workbookData}
              onAddNewWorkbook={handleNavigate}
            />
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
