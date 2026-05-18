import { create } from 'zustand';

import type {
  CandidateFilters,
  CandidateSort,
  CandidateStatus,
  Program,
} from '@/features/candidates/types/candidate';

type CandidateUiState = {
  currentStep: number;
  filters: CandidateFilters;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  setName: (name: string) => void;
  setProgram: (program: Program | 'all') => void;
  setStatus: (status: CandidateStatus | 'all') => void;
  setSort: (sort: CandidateSort) => void;
  setPage: (page: number) => void;
};

const initialFilters: CandidateFilters = {
  name: '',
  program: 'all',
  status: 'all',
  sort: 'registrationDateDesc',
  page: 1,
};

export const useCandidateUiStore = create<CandidateUiState>((set) => ({
  currentStep: 0,
  filters: initialFilters,
  setCurrentStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 2) })),
  previousStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 0) })),
  setName: (name) =>
    set((state) => ({
      filters: { ...state.filters, name, page: 1 },
    })),
  setProgram: (program) =>
    set((state) => ({
      filters: { ...state.filters, program, page: 1 },
    })),
  setStatus: (status) =>
    set((state) => ({
      filters: { ...state.filters, status, page: 1 },
    })),
  setSort: (sort) =>
    set((state) => ({
      filters: { ...state.filters, sort, page: 1 },
    })),
  setPage: (page) =>
    set((state) => ({
      filters: { ...state.filters, page },
    })),
}));
