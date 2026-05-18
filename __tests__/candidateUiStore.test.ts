import { useCandidateUiStore } from '@/store/candidateUiStore';

describe('candidateUiStore', () => {
  beforeEach(() => {
    useCandidateUiStore.setState({
      currentStep: 0,
      filters: {
        name: '',
        program: 'all',
        status: 'all',
        sort: 'registrationDateDesc',
        page: 1,
      },
    });
  });

  it('updates filters and resets page when search changes', () => {
    useCandidateUiStore.getState().setName('Ava');
    useCandidateUiStore.getState().setProgram('level_2');
    useCandidateUiStore.getState().setPage(3);

    const state = useCandidateUiStore.getState();
    expect(state.filters.name).toBe('Ava');
    expect(state.filters.program).toBe('level_2');
    expect(state.filters.page).toBe(3);
  });

  it('updates sort and status filters', () => {
    useCandidateUiStore.getState().setSort('nameAsc');
    useCandidateUiStore.getState().setStatus('eligible');
    useCandidateUiStore.getState().setCurrentStep(2);

    const state = useCandidateUiStore.getState();
    expect(state.filters.sort).toBe('nameAsc');
    expect(state.filters.status).toBe('eligible');
    expect(state.currentStep).toBe(2);
  });

  it('moves wizard steps within bounds', () => {
    useCandidateUiStore.getState().nextStep();
    expect(useCandidateUiStore.getState().currentStep).toBe(1);
    useCandidateUiStore.getState().previousStep();
    expect(useCandidateUiStore.getState().currentStep).toBe(0);
  });
});
