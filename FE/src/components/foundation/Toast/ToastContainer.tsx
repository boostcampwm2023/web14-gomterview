import { useEffect, useRef, useState } from 'react';
import { ToastEvent, ToastProps } from '@foundation/Toast/type';
import { eventManager } from '@foundation/Toast/EventManger';
import Toast from '@foundation/Toast/Toast';
import { css } from '@emotion/react';

const useToastContainer = () => {
  const [toastList, setToastList] = useState(new Map<string, ToastProps>());

  // 토스트 추가
  const addToast = (props: ToastProps) => {
    setToastList((prev) => new Map(prev).set(props.toastId, props));
  };

  // 토스트 업데이트
  const updateToast = (id: string, props: ToastProps) => {
    setToastList((prev) => {
      const newMap = new Map(prev);
      newMap.set(id, { ...newMap.get(id), ...props });
      return newMap;
    });
  };

  // 토스트 삭제
  const deleteToast = (id: string) => {
    setToastList((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  };

  useEffect(() => {
    eventManager.on(ToastEvent.Add, addToast);
    eventManager.on(ToastEvent.Update, updateToast);
    eventManager.on(ToastEvent.Delete, deleteToast);

    // 컴포넌트 언마운트 시 리스너 해제
    return () => {
      eventManager.off(ToastEvent.Add, addToast);
      eventManager.off(ToastEvent.Update, updateToast);
      eventManager.off(ToastEvent.Delete, deleteToast);
    };
  }, []);

  const getToastToRender = () => {
    return Array.from(toastList);
  };

  return { getToastToRender };
};

export const ToastContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { getToastToRender } = useToastContainer();

  const list = getToastToRender();
  return (
    <div
      ref={containerRef}
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        row-gap: 0.5rem;
        z-index: 99999;
      `}
    >
      {list.map(([toastId, toastProps]) => (
        <Toast key={toastId} {...toastProps} />
      ))}
    </div>
  );
};
