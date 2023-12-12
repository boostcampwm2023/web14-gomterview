import { ToastEvent, ToastProps, ToastType } from '@foundation/Toast/type';
import { eventManager } from '@foundation/Toast/eventManger';

type ToastAddFunctionProps = Omit<ToastProps, 'toastId' | 'type'>;
type ToastOptions = Omit<ToastProps, 'toastId' | 'type' | 'text'>;
const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(4);
};

const emitAddToast = (type: ToastType, toastProps: ToastAddFunctionProps) => {
  const id = generateUniqueId();
  eventManager.emit(ToastEvent.Add, {
    ...toastProps,
    toastId: id,
    type,
  });
  return id;
};

const emitUpdateToast = (toastId: string, text: string) => {
  eventManager.emit(ToastEvent.Update, toastId, text);
  return toastId;
};

const emitDeleteToast = (toastId: string) => {
  eventManager.emit(ToastEvent.Delete, toastId);
};

export const toast = {
  default: (text: string, toastOptions?: ToastOptions) =>
    emitAddToast('default', { text: text, ...toastOptions }),
  info: (text: string, toastOptions?: ToastOptions) =>
    emitAddToast('info', { text: text, ...toastOptions }),
  success: (text: string, toastOptions?: ToastOptions) =>
    emitAddToast('success', { text: text, ...toastOptions }),
  warning: (text: string, toastOptions?: ToastOptions) =>
    emitAddToast('warning', { text: text, ...toastOptions }),
  error: (text: string, toastOptions?: ToastOptions) =>
    emitAddToast('error', { text: text, ...toastOptions }),
  update: (toastId: string, text: string) => emitUpdateToast(toastId, text),
  delete: (toastId: string) => emitDeleteToast(toastId),
};
