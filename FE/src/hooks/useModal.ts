import { modalState } from '@atoms/modal';
import { useCallback, useId, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';

const isArrEmpty = (arr: unknown[]) => arr.length === 0;

const useModal = (component: React.FC) => {
  const [modalElements, setModal] = useRecoilState(modalState);
  const [isOpen, setIsOpen] = useState(false);

  const id = useId();

  const openModal = useCallback(() => {
    setIsOpen(true);
    setModal((pre) => [...pre, { id: id, element: modalComponent }]);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModal((pre) => pre.filter((c) => c.id !== id));

    if (isArrEmpty(modalElements)) document.body.style.overflow = 'unset';
  }, []);

  const modalComponent = useMemo(() => component, []);

  return { isOpen, openModal, closeModal };
};

export default useModal;
