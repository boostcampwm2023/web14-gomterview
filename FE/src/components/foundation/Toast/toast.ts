import { ToastEvent, ToastProps } from '@foundation/Toast/type';
import { eventManager } from '@foundation/Toast/eventManger';

const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(4);
};
export const toast = (toastProps: Omit<ToastProps, 'toastId'>) => {
  const id = generateUniqueId();
  eventManager.emit(ToastEvent.Add, { ...toastProps, toastId: id });
};
