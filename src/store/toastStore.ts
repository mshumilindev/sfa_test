import { create } from 'zustand';

import { apiToastAutoDismissMs } from '@/shared/i18n/messages';

export type ToastTone = 'success' | 'error';

export type Toast = {
  id: string;
  message: string;
  tone: ToastTone;
};

type ToastInput = {
  message: string;
  tone: ToastTone;
};

type ToastState = {
  toasts: Toast[];
  enqueueToast: (toast: ToastInput) => string;
  dismissToast: (id: string) => void;
};

const dismissTimers = new Map<string, ReturnType<typeof setTimeout>>();

let toastIdCounter = 0;

const createToastId = (): string => {
  if (typeof crypto?.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  toastIdCounter += 1;
  return `toast-${toastIdCounter}`;
};

const clearDismissTimer = (id: string): void => {
  const timer = dismissTimers.get(id);
  if (timer) {
    clearTimeout(timer);
    dismissTimers.delete(id);
  }
};

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  enqueueToast: (toast) => {
    const id = createToastId();
    const nextToast: Toast = { id, ...toast };

    set((state) => ({
      toasts: [...state.toasts, nextToast],
    }));

    const timer = setTimeout(() => {
      get().dismissToast(id);
    }, apiToastAutoDismissMs);
    dismissTimers.set(id, timer);

    return id;
  },
  dismissToast: (id) => {
    clearDismissTimer(id);
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));
