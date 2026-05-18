import { apiToastAutoDismissMs } from '@/shared/i18n/messages';
import { useToastStore } from '@/store/toastStore';

describe('toastStore', () => {
  beforeEach(() => {
    useToastStore.setState({ toasts: [] });
  });

  it('enqueues and dismisses toasts', () => {
    useToastStore.getState().enqueueToast({ tone: 'success', message: 'Saved' });

    expect(useToastStore.getState().toasts).toHaveLength(1);
    expect(useToastStore.getState().toasts[0]?.message).toBe('Saved');

    const toastId = useToastStore.getState().toasts[0]?.id ?? '';
    useToastStore.getState().dismissToast(toastId);

    expect(useToastStore.getState().toasts).toHaveLength(0);
  });

  it('auto-dismisses toasts after the configured duration', () => {
    jest.useFakeTimers();

    useToastStore.getState().enqueueToast({ tone: 'error', message: 'Failed' });
    expect(useToastStore.getState().toasts).toHaveLength(1);

    jest.advanceTimersByTime(apiToastAutoDismissMs);
    expect(useToastStore.getState().toasts).toHaveLength(0);

    jest.useRealTimers();
  });
});
