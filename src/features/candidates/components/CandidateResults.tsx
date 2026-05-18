'use client';

import { useTranslations } from 'next-intl';

import type { Candidate } from '@/features/candidates/types/candidate';
import {
  formatCandidateName,
  formatRegistrationDate,
  programLabels,
} from '@/features/candidates/utils/candidateDisplay';
import {
  getColumnAriaSort,
  toggleNameSort,
  toggleRegistrationDateSort,
} from '@/features/candidates/utils/candidateFilters';
import { useCandidateUiStore } from '@/store/candidateUiStore';

import { StatusBadge } from './StatusBadge';
import styles from './CandidateDashboard.module.scss';

type CandidateResultsProps = {
  candidates: Candidate[];
};

export const CandidateResults = ({ candidates }: CandidateResultsProps) => {
  const t = useTranslations('candidates.dashboard');
  const tTable = useTranslations('candidates.dashboard.table');
  const sort = useCandidateUiStore((state) => state.filters.sort);
  const setSort = useCandidateUiStore((state) => state.setSort);

  return (
    <>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <caption className={styles.visuallyHidden}>{tTable('caption')}</caption>
          <thead>
            <tr>
              <th aria-sort={getColumnAriaSort('name', sort)} scope="col">
                <button
                  className={styles.sortButton}
                  onClick={() => setSort(toggleNameSort(sort))}
                  type="button"
                >
                  {tTable('name')}
                  <span className={styles.visuallyHidden}>{tTable('sortName')}</span>
                </button>
              </th>
              <th scope="col">{tTable('email')}</th>
              <th scope="col">{tTable('program')}</th>
              <th scope="col">{tTable('status')}</th>
              <th aria-sort={getColumnAriaSort('registrationDate', sort)} scope="col">
                <button
                  className={styles.sortButton}
                  onClick={() => setSort(toggleRegistrationDateSort(sort))}
                  type="button"
                >
                  {tTable('registrationDate')}
                  <span className={styles.visuallyHidden}>{tTable('sortRegistrationDate')}</span>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>
                  <span className={styles.cellWrap}>{formatCandidateName(candidate)}</span>
                </td>
                <td>
                  <span className={styles.cellWrap}>{candidate.email}</span>
                </td>
                <td>
                  <span className={styles.cellWrap}>{programLabels[candidate.program]}</span>
                </td>
                <td>
                  <StatusBadge status={candidate.status} />
                </td>
                <td>
                  <span className={styles.cellWrap}>
                    {formatRegistrationDate(candidate.registrationDate)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className={styles.cardList} aria-label={t('cardListLabel')}>
        {candidates.map((candidate) => (
          <li className={styles.card} key={candidate.id}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardName}>{formatCandidateName(candidate)}</h2>
              <StatusBadge status={candidate.status} />
            </div>
            <dl className={styles.cardDetails}>
              <div>
                <dt>{tTable('email')}</dt>
                <dd>{candidate.email}</dd>
              </div>
              <div>
                <dt>{tTable('program')}</dt>
                <dd>{programLabels[candidate.program]}</dd>
              </div>
              <div>
                <dt>{tTable('registrationDate')}</dt>
                <dd>{formatRegistrationDate(candidate.registrationDate)}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
};
