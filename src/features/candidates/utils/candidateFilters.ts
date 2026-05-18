import type {
  CandidateSort,
  CandidateStatus,
  Program,
} from '@/features/candidates/types/candidate';
import { candidateStatusSchema, programSchema } from '@/features/candidates/types/candidate';

const candidateSortValues = [
  'registrationDateDesc',
  'registrationDateAsc',
  'nameAsc',
  'nameDesc',
] as const satisfies readonly CandidateSort[];

export const parseStatusFilter = (value: string): CandidateStatus | 'all' => {
  if (value === 'all') {
    return 'all';
  }

  return candidateStatusSchema.parse(value);
};

export const parseProgramFilter = (value: string): Program | 'all' => {
  if (value === 'all') {
    return 'all';
  }

  return programSchema.parse(value);
};

export const parseSort = (value: string): CandidateSort => {
  const result = candidateSortValues.find((candidateSort) => candidateSort === value);
  return result ?? 'registrationDateDesc';
};

export type SortableColumn = 'name' | 'registrationDate';

export const getColumnAriaSort = (
  column: SortableColumn,
  sort: CandidateSort,
): 'ascending' | 'descending' | 'none' => {
  if (column === 'name') {
    if (sort === 'nameAsc') {
      return 'ascending';
    }

    if (sort === 'nameDesc') {
      return 'descending';
    }

    return 'none';
  }

  if (sort === 'registrationDateAsc') {
    return 'ascending';
  }

  if (sort === 'registrationDateDesc') {
    return 'descending';
  }

  return 'none';
};

export const toggleNameSort = (currentSort: CandidateSort): CandidateSort =>
  currentSort === 'nameAsc' ? 'nameDesc' : 'nameAsc';

export const toggleRegistrationDateSort = (currentSort: CandidateSort): CandidateSort =>
  currentSort === 'registrationDateAsc' ? 'registrationDateDesc' : 'registrationDateAsc';
