import type { Candidate, HighestDegree, Program } from '@/features/candidates/types/candidate';
import type { RegistrationFieldName } from '@/features/candidates/types/registration';
import { formatMessage, messages } from '@/shared/i18n/messages';

const registrationSteps = messages.candidates.registration.steps as ReadonlyArray<{
  title: string;
  description: string;
  fields: readonly RegistrationFieldName[];
}>;

export const getCandidatesMessages = () => ({
  api: {
    invalidRegistrationPayload: formatMessage('candidates.api.invalidRegistrationPayload'),
    invalidJson: formatMessage('candidates.api.invalidJson'),
    invalidExamWindow: formatMessage('candidates.api.invalidExamWindow'),
    duplicateEmail: formatMessage('candidates.api.duplicateEmail'),
  },
  labels: {
    program: messages.candidates.labels.program as Record<Program, string>,
    degree: messages.candidates.labels.degree as Record<HighestDegree, string>,
    status: messages.candidates.labels.status as Record<Candidate['status'], string>,
  },
  filters: {
    allPrograms: formatMessage('candidates.filters.allPrograms'),
    allStatuses: formatMessage('candidates.filters.allStatuses'),
    sort: {
      registrationDateDesc: formatMessage('candidates.filters.sort.registrationDateDesc'),
      registrationDateAsc: formatMessage('candidates.filters.sort.registrationDateAsc'),
      nameAsc: formatMessage('candidates.filters.sort.nameAsc'),
      nameDesc: formatMessage('candidates.filters.sort.nameDesc'),
    },
  },
  fields: messages.candidates.fields as Record<RegistrationFieldName, string>,
  validation: {
    nameMin: (label: string) => formatMessage('candidates.validation.nameMin', { label }),
    nameMax: (label: string) => formatMessage('candidates.validation.nameMax', { label }),
    invalidEmail: formatMessage('candidates.validation.invalidEmail'),
    invalidPhone: formatMessage('candidates.validation.invalidPhone'),
    countryRequired: formatMessage('candidates.validation.countryRequired'),
    countryInvalid: formatMessage('candidates.validation.countryInvalid'),
    graduationYearInvalid: formatMessage('candidates.validation.graduationYearInvalid'),
    experienceWholeYears: formatMessage('candidates.validation.experienceWholeYears'),
    experienceNegative: formatMessage('candidates.validation.experienceNegative'),
    experienceMax: formatMessage('candidates.validation.experienceMax'),
    graduationYearRange: (minYear: number, maxYear: number) =>
      formatMessage('candidates.validation.graduationYearRange', { minYear, maxYear }),
    universityRequired: formatMessage('candidates.validation.universityRequired'),
    examWindowRequired: formatMessage('candidates.validation.examWindowRequired'),
    termsRequired: formatMessage('candidates.validation.termsRequired'),
    graduationYearHint: (minYear: number, maxYear: number) =>
      formatMessage('candidates.validation.graduationYearHint', { minYear, maxYear }),
  },
  dashboard: {
    title: formatMessage('candidates.dashboard.title'),
    description: formatMessage('candidates.dashboard.description'),
    registerLink: formatMessage('candidates.dashboard.registerLink'),
    nameLabel: formatMessage('candidates.dashboard.nameLabel'),
    programLabel: formatMessage('candidates.dashboard.programLabel'),
    statusLabel: formatMessage('candidates.dashboard.statusLabel'),
    sortLabel: formatMessage('candidates.dashboard.sortLabel'),
    searchPlaceholder: formatMessage('candidates.dashboard.searchPlaceholder'),
    emptyState: formatMessage('candidates.dashboard.emptyState'),
    loadError: formatMessage('candidates.dashboard.loadError'),
    loadingLabel: formatMessage('candidates.dashboard.loadingLabel'),
    paginationLabel: formatMessage('candidates.dashboard.paginationLabel'),
    pageStatus: (page: number, pageCount: number) =>
      formatMessage('candidates.dashboard.pageStatus', { page, pageCount }),
    table: messages.candidates.dashboard.table,
    cardListLabel: formatMessage('candidates.dashboard.cardListLabel'),
  },
  registration: {
    stepsLabel: formatMessage('candidates.registration.stepsLabel'),
    stepErrorSummary: formatMessage('candidates.registration.stepErrorSummary'),
    emailAlreadyRegistered: formatMessage('candidates.registration.emailAlreadyRegistered'),
    emailChecking: formatMessage('candidates.registration.emailChecking'),
    backToDashboard: formatMessage('candidates.registration.backToDashboard'),
    submitRegistration: formatMessage('candidates.registration.submitRegistration'),
    successTitle: formatMessage('candidates.registration.successTitle'),
    successBody: (candidateName: string) =>
      formatMessage('candidates.registration.successBody', { candidateName }),
    returnToDashboard: formatMessage('candidates.registration.returnToDashboard'),
    examWindowPlaceholder: formatMessage('candidates.registration.examWindowPlaceholder'),
    examWindowNotSelected: formatMessage('candidates.registration.examWindowNotSelected'),
    termsLabel: formatMessage('candidates.registration.termsLabel'),
    phoneHint: formatMessage('candidates.registration.phoneHint'),
    optionalHint: formatMessage('candidates.registration.optionalHint'),
    experienceYears: (years: number) =>
      formatMessage('candidates.registration.experienceYears', { years }),
    steps: registrationSteps.map((step) => ({
      title: step.title,
      description: step.description,
      fields: [...step.fields],
    })),
    summary: messages.candidates.registration.summary,
  },
  combobox: messages.candidates.combobox,
  eligibility: messages.candidates.eligibility,
});

export type CandidatesMessages = ReturnType<typeof getCandidatesMessages>;

export const candidatesMessages = getCandidatesMessages();
