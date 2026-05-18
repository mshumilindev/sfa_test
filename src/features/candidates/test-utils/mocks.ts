import type { SWRResponse } from 'swr';

import type { useSubmitCandidate } from '@/features/candidates/hooks/useCandidates';
import type { RegistrationFormValues } from '@/features/candidates/schemas/registrationSchema';
import type { CandidateSubmissionResponse } from '@/features/candidates/types/candidate';

import { buildCandidateSubmissionResponse } from './builders';

export const createUseSWRReturnMock = <Data, SwrError = Error>(
  overrides: Partial<SWRResponse<Data, SwrError>> = {},
): SWRResponse<Data, SwrError> => ({
  data: undefined,
  error: undefined,
  isLoading: false,
  isValidating: false,
  mutate: jest.fn(),
  ...overrides,
});

export type SubmitCandidateMutationMock = ReturnType<typeof useSubmitCandidate>;

const defaultSubmitTrigger = async (
  _values: RegistrationFormValues,
): Promise<CandidateSubmissionResponse> => buildCandidateSubmissionResponse();

export const createSubmitCandidateMutationMock = (
  overrides: Partial<SubmitCandidateMutationMock> = {},
): SubmitCandidateMutationMock => ({
  data: undefined,
  error: undefined,
  isMutating: false,
  trigger: defaultSubmitTrigger,
  reset: jest.fn(),
  ...overrides,
});

export const useSWRMutationMock = jest.fn(
  (): SubmitCandidateMutationMock => createSubmitCandidateMutationMock(),
);

export type WizardUiState = {
  currentStep: number;
  setCurrentStep: jest.Mock<void, [number]>;
  nextStep: jest.Mock<void, []>;
  previousStep: jest.Mock<void, []>;
};

export const stubUseSWR = <Data, SwrError = Error>(
  overrides: Partial<SWRResponse<Data, SwrError>> = {},
): void => {
  const useSWRModule = jest.requireMock('swr') as { default: jest.Mock };
  useSWRModule.default.mockReturnValue(createUseSWRReturnMock<Data, SwrError>(overrides));
};

export const createWizardUiState = (initialStep = 0): WizardUiState => {
  const state: WizardUiState = {
    currentStep: initialStep,
    setCurrentStep: jest.fn((step: number) => {
      state.currentStep = step;
    }),
    nextStep: jest.fn(() => {
      state.currentStep = Math.min(state.currentStep + 1, 2);
    }),
    previousStep: jest.fn(() => {
      state.currentStep = Math.max(state.currentStep - 1, 0);
    }),
  };

  return state;
};

export const createCandidateUiStoreState = () => ({
  filters: {
    name: '',
    program: 'all' as const,
    status: 'all' as const,
    sort: 'registrationDateDesc' as const,
    page: 1,
  },
  setName: jest.fn(),
  setProgram: jest.fn(),
  setStatus: jest.fn(),
  setSort: jest.fn(),
  setPage: jest.fn(),
});
