import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { getServerCandidateList } from '@/features/candidates/api/serverCandidates';
import { CandidateDashboard } from '@/features/candidates/components/CandidateDashboard';

import styles from './candidates.module.scss';

export const dynamic = 'force-dynamic';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations('candidates.dashboard');

  return {
    title: t('title'),
    description: t('description'),
  };
};

const CandidatesPage = async () => {
  const initialCandidates = getServerCandidateList();

  return (
    <main className={styles.page}>
      <CandidateDashboard initialCandidates={initialCandidates} />
    </main>
  );
};

export default CandidatesPage;
