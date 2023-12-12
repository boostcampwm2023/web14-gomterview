import {
  ToastPositionStyle,
  ToastProgressBarStyle,
} from '@foundation/Toast/styles/Toast.styles';

export type ToastPosition = keyof typeof ToastPositionStyle;
export type ToastType = keyof typeof ToastProgressBarStyle;
export type ToastProps = {
  toastId: string;
  text: string;
  autoClose?: false | number;
  closeOnClick?: boolean;
  type?: ToastType;
  pauseOnHover?: boolean;
  position?: ToastPosition;
  toggle?: boolean;
};

export const enum ToastEvent {
  Add,
  Delete,
  Update,
}

type OnAddCallback = (props: ToastProps) => void;
type OnDeleteCallback = (id: string) => void;
type OnUpdateCallback = (id: string, text: string) => void;

export type Callback = OnAddCallback | OnDeleteCallback | OnUpdateCallback;

type TimeoutId = ReturnType<typeof setTimeout>;

export interface EventManager {
  list: Map<ToastEvent, Callback[]>;
  emitQueue: Map<ToastEvent, TimeoutId[]>;

  on(event: ToastEvent.Add, callback: OnAddCallback): EventManager;
  on(event: ToastEvent.Delete, callback: OnDeleteCallback): EventManager;
  on(event: ToastEvent.Update, callback: OnUpdateCallback): EventManager;

  off(event: ToastEvent.Add, callback: OnAddCallback): EventManager;
  off(event: ToastEvent.Delete, callback: OnDeleteCallback): EventManager;
  off(event: ToastEvent.Update, callback: OnUpdateCallback): EventManager;

  cancelEmit(event: ToastEvent): EventManager;
  emit(event: ToastEvent.Add, props: ToastProps): void;
  emit(event: ToastEvent.Delete, id: string): void;
  emit(event: ToastEvent.Update, id: string, text: string): void;
}
