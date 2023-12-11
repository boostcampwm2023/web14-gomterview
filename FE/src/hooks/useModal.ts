import { modalState } from '@atoms/modal';
import { useCallback, useId, useState } from 'react';
import { useRecoilState } from 'recoil';

const isArrEmpty = (arr: unknown[]) => arr.length === 0;

const useModal = (component: React.FC) => {
  const [modalElements, setModal] = useRecoilState(modalState);
  const [isOpen, setIsOpen] = useState(false);

  const id = useId();

  const openModal = useCallback(() => {
    setIsOpen(true);
    setModal((pre) => [...pre, { id: id, element: component }]);
    document.body.style.overflow = 'hidden';
  }, [component, id, setModal]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModal((pre) => pre.filter((c) => c.id !== id));

    if (isArrEmpty(modalElements)) document.body.style.overflow = 'unset';
  }, [id, modalElements, setModal]);

  return { isOpen, openModal, closeModal };
};

export default useModal;
