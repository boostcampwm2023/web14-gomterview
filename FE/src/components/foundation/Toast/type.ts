import {
  ToastPositionStyle,
  ToastTypeStyle,
} from '@foundation/Toast/Toast.styles';

export type ToastPosition = keyof typeof ToastPositionStyle;
export type ToastProps = {
  toastId: string;
  text: string;
  autoClose?: false | number;
  closeOnClick?: boolean;
  type?: keyof typeof ToastTypeStyle;
  pauseOnHover?: boolean;
  position?: ToastPosition;
};

export const enum ToastEvent {
  Add,
  Delete,
}

type OnAddCallback = (props: ToastProps) => void;
type OnDeleteCallback = (id: string) => void;

export type Callback = OnAddCallback | OnDeleteCallback;

type TimeoutId = ReturnType<typeof setTimeout>;

export interface EventManager {
  list: Map<ToastEvent, Callback[]>;
  emitQueue: Map<ToastEvent, TimeoutId[]>;

  on(event: ToastEvent.Add, callback: OnAddCallback): EventManager;
  on(event: ToastEvent.Delete, callback: OnDeleteCallback): EventManager;

  off(event: ToastEvent.Add, callback: OnAddCallback): EventManager;
  off(event: ToastEvent.Delete, callback: OnDeleteCallback): EventManager;

  cancelEmit(event: ToastEvent): EventManager;
  emit(event: ToastEvent.Add, props: ToastProps): void;
  emit(event: ToastEvent.Delete, id: string): void;
}
