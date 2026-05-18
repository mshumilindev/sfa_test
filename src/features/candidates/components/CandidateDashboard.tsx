'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import {
  programFilterOptions,
  sortOptions,
  statusFilterOptions,
} from '@/features/candidates/constants/domainOptions';
import { candidatePageSize } from '@/features/candidates/constants/pagination';
import { candidateRoutes } from '@/features/candidates/constants/routes';
import { useCandidates } from '@/features/candidates/hooks/useCandidates';
import type { CandidateListResponse } from '@/features/candidates/types/candidate';
import {
  parseProgramFilter,
  parseSort,
  parseStatusFilter,
} from '@/features/candidates/utils/candidateFilters';
import { useCandidateUiStore } from '@/store/candidateUiStore';

import { EmptyState } from '@/shared/components/EmptyState/EmptyState';
import { LoadingState } from '@/shared/components/LoadingState/LoadingState';

import { CandidateDashboardSkeleton } from './CandidateDashboardSkeleton';
import { CandidateResults } from './CandidateResults';
import styles from './CandidateDashboard.module.scss';

type CandidateDashboardProps = {
  initialCandidates?: CandidateListResponse;
};

export const CandidateDashboard = ({ initialCandidates }: CandidateDashboardProps) => {
  const t = useTranslations('candidates.dashboard');
  const tCommon = useTranslations('common.actions');
  const filters = useCandidateUiStore((state) => state.filters);
  const setName = useCandidateUiStore((state) => state.setName);
  const setProgram = useCandidateUiStore((state) => state.setProgram);
  const setStatus = useCandidateUiStore((state) => state.setStatus);
  const setSort = useCandidateUiStore((state) => state.setSort);
  const setPage = useCandidateUiStore((state) => state.setPage);
  const { candidates, total, isLoading, isError, hasListData, isRetrying, retryLoad } =
    useCandidates(filters, initialCandidates);
  const pageCount = Math.max(1, Math.ceil(total / candidatePageSize));
  const showLoading = isLoading && !hasListData;
  const showErrorState = !showLoading && isError;
  const showEmptyState = !showLoading && !isError && total === 0;
  const showResults = !showLoading && !isError && total > 0;

  return (
    <section className={styles.dashboard} aria-labelledby="candidate-dashboard-title">
      <div className={styles.header}>
        <div>
          <h1 id="candidate-dashboard-title">{t('title')}</h1>
          <p>{t('description')}</p>
        </div>
        <Link className={styles.registerLink} href={candidateRoutes.register}>
          {t('registerLink')}
        </Link>
      </div>

      <div className={styles.filters}>
        <label>
          {t('nameLabel')}
          <input
            type="text"
            role="searchbox"
            value={filters.name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t('searchPlaceholder')}
          />
        </label>
        <label>
          {t('programLabel')}
          <select
            value={filters.program}
            onChange={(event) => setProgram(parseProgramFilter(event.target.value))}
          >
            {programFilterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          {t('statusLabel')}
          <select
            value={filters.status}
            onChange={(event) => setStatus(parseStatusFilter(event.target.value))}
          >
            {statusFilterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          {t('sortLabel')}
          <select value={filters.sort} onChange={(event) => setSort(parseSort(event.target.value))}>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {showLoading ? (
        <LoadingState label={t('loadingLabel')}>
          <CandidateDashboardSkeleton />
        </LoadingState>
      ) : null}

      {showErrorState ? (
        <div className={styles.stateError} role="alert">
          <p>{t('loadError')}</p>
          <button
            aria-busy={isRetrying}
            className={styles.retryButton}
            disabled={isRetrying}
            onClick={() => {
              void retryLoad();
            }}
            type="button"
          >
            {isRetrying ? tCommon('processing') : tCommon('retry')}
          </button>
        </div>
      ) : null}

      {showEmptyState ? <EmptyState className={styles.state} message={t('emptyState')} /> : null}

      {showResults ? <CandidateResults candidates={candidates} /> : null}

      {showResults ? (
        <div className={styles.pagination} aria-label={t('paginationLabel')}>
          <button
            type="button"
            disabled={filters.page === 1}
            onClick={() => setPage(filters.page - 1)}
          >
            {tCommon('previous')}
          </button>
          <span>{t('pageStatus', { page: filters.page, pageCount })}</span>
          <button
            type="button"
            disabled={filters.page === pageCount}
            onClick={() => setPage(filters.page + 1)}
          >
            {tCommon('next')}
          </button>
        </div>
      ) : null}
    </section>
  );
};
