import { modalState } from '@atoms/modal';
import { useCallback, useEffect, useId, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';

const useModal = (component: React.FC) => {
  const [, setModal] = useRecoilState(modalState);
  const [isOpen, setIsOpen] = useState(false);

  const id = useId();

  const openModal = useCallback(() => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  }, []);

  const modalComponent = useMemo(() => component, []);

  useEffect(() => {
    if (isOpen) {
      setModal((pre) => [...pre, { id: id, element: modalComponent }]);
    } else {
      setModal((pre) => pre.filter((c) => c.id !== id));
    }
  }, [id, isOpen, modalComponent, setModal]);

  return { isOpen, openModal, closeModal };
};

export default useModal;
