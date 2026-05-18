import { formatMessage } from '@/shared/i18n/messages';

export const getSharedMessages = () => ({
  app: {
    title: formatMessage('app.title'),
    description: formatMessage('app.description'),
  },
  api: {
    feedback: {
      candidatesLoadError: formatMessage('api.feedback.candidatesLoadError'),
      registrationSubmitError: formatMessage('api.feedback.registrationSubmitError'),
      registrationSubmitSuccess: (candidateName: string) =>
        formatMessage('api.feedback.registrationSubmitSuccess', { candidateName }),
      networkTimeout: formatMessage('api.feedback.networkTimeout'),
      unexpectedError: formatMessage('api.feedback.unexpectedError'),
    },
  },
  common: {
    actions: {
      back: formatMessage('common.actions.back'),
      close: formatMessage('common.actions.close'),
      continue: formatMessage('common.actions.continue'),
      submit: formatMessage('common.actions.submit'),
      previous: formatMessage('common.actions.previous'),
      next: formatMessage('common.actions.next'),
      processing: formatMessage('common.actions.processing'),
      submitting: formatMessage('common.actions.submitting'),
    },
    feedback: {
      dismissNotification: formatMessage('common.feedback.dismissNotification'),
      notifications: formatMessage('common.feedback.notifications'),
      unexpectedErrorTitle: formatMessage('common.feedback.unexpectedErrorTitle'),
      unexpectedErrorBody: formatMessage('common.feedback.unexpectedErrorBody'),
      reloadPage: formatMessage('common.feedback.reloadPage'),
    },
    loading: {
      defaultLabel: formatMessage('common.loading.defaultLabel'),
    },
  },
});

export type SharedMessages = ReturnType<typeof getSharedMessages>;

export const sharedMessages = getSharedMessages();
