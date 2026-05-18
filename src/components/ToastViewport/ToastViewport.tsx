'use client';

import { useTranslations } from 'next-intl';

import { useToastStore } from '@/store/toastStore';

import styles from './ToastViewport.module.scss';

export const ToastViewport = () => {
  const tFeedback = useTranslations('common.feedback');
  const tActions = useTranslations('common.actions');
  const toasts = useToastStore((state) => state.toasts);
  const dismissToast = useToastStore((state) => state.dismissToast);

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div aria-label={tFeedback('notifications')} className={styles.viewport} role="region">
      {toasts.map((toast) => (
        <div
          className={`${styles.toast} ${styles[toast.tone]}`}
          key={toast.id}
          role={toast.tone === 'error' ? 'alert' : 'status'}
        >
          <p className={styles.message}>{toast.message}</p>
          <button
            aria-label={tFeedback('dismissNotification')}
            className={styles.closeButton}
            onClick={() => dismissToast(toast.id)}
            type="button"
          >
            {tActions('close')}
          </button>
        </div>
      ))}
    </div>
  );
};
