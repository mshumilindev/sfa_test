import { candidatesMessages } from '@/features/candidates/i18n/messages';
import type {
  CandidateSort,
  CandidateStatus,
  HighestDegree,
  Program,
} from '@/features/candidates/types/candidate';

export type SelectOption<T extends string> = {
  value: T;
  label: string;
};

export const programOptions: SelectOption<Program>[] = (
  Object.entries(candidatesMessages.labels.program) as [Program, string][]
).map(([value, label]) => ({ value, label }));

export const programFilterOptions: SelectOption<Program | 'all'>[] = [
  { value: 'all', label: candidatesMessages.filters.allPrograms },
  ...programOptions,
];

export const degreeOptions: SelectOption<HighestDegree>[] = (
  Object.entries(candidatesMessages.labels.degree) as [HighestDegree, string][]
).map(([value, label]) => ({ value, label }));

export const statusFilterOptions: SelectOption<CandidateStatus | 'all'>[] = [
  { value: 'all', label: candidatesMessages.filters.allStatuses },
  ...(Object.entries(candidatesMessages.labels.status) as [CandidateStatus, string][]).map(
    ([value, label]) => ({ value, label }),
  ),
];

export const sortOptions: SelectOption<CandidateSort>[] = [
  { value: 'registrationDateDesc', label: candidatesMessages.filters.sort.registrationDateDesc },
  { value: 'registrationDateAsc', label: candidatesMessages.filters.sort.registrationDateAsc },
  { value: 'nameAsc', label: candidatesMessages.filters.sort.nameAsc },
  { value: 'nameDesc', label: candidatesMessages.filters.sort.nameDesc },
];
