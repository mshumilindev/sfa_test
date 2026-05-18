import type { Candidate } from '@/features/candidates/types/candidate';
import { buildAmyCandidate, buildZoeCandidate } from '@/features/candidates/test-utils/builders';
import {
  getColumnAriaSort,
  parseProgramFilter,
  parseSort,
  parseStatusFilter,
  toggleNameSort,
  toggleRegistrationDateSort,
} from '@/features/candidates/utils/candidateFilters';
import { candidatePageSize } from '@/features/candidates/constants/pagination';

const sampleCandidates: Candidate[] = [buildZoeCandidate(), buildAmyCandidate()];

const filterCandidates = (
  candidates: Candidate[],
  name: string,
  program: Candidate['program'] | 'all',
) =>
  candidates.filter((candidate) => {
    const matchesProgram = program === 'all' || candidate.program === program;
    const query = name.trim().toLowerCase();
    const fullName = `${candidate.firstName} ${candidate.lastName}`.toLowerCase();
    const matchesName = !query || fullName.includes(query);
    return matchesProgram && matchesName;
  });

describe('candidateFilters', () => {
  it('parses status, program, and sort values', () => {
    expect(parseStatusFilter('all')).toBe('all');
    expect(parseStatusFilter('eligible')).toBe('eligible');
    expect(parseProgramFilter('all')).toBe('all');
    expect(parseProgramFilter('level_2')).toBe('level_2');
    expect(parseSort('unknown')).toBe('registrationDateDesc');
  });

  it('filters candidates by name and program deterministically', () => {
    const filtered = filterCandidates(sampleCandidates, 'amy', 'level_2');
    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.firstName).toBe('Amy');
  });

  it('uses a shared page size constant', () => {
    expect(candidatePageSize).toBe(5);
  });

  it('toggles sort values for sortable table columns', () => {
    expect(toggleNameSort('nameAsc')).toBe('nameDesc');
    expect(toggleNameSort('nameDesc')).toBe('nameAsc');
    expect(toggleRegistrationDateSort('registrationDateAsc')).toBe('registrationDateDesc');
    expect(toggleRegistrationDateSort('registrationDateDesc')).toBe('registrationDateAsc');
    expect(getColumnAriaSort('name', 'nameAsc')).toBe('ascending');
    expect(getColumnAriaSort('registrationDate', 'registrationDateDesc')).toBe('descending');
    expect(getColumnAriaSort('name', 'registrationDateDesc')).toBe('none');
  });
});
