import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { getServerExamWindows } from '@/features/candidates/api/serverCandidates';
import { RegistrationWizard } from '@/features/candidates/registration/components/RegistrationWizard';

import styles from '@/app/candidates/candidates.module.scss';

export const dynamic = 'force-dynamic';

export const generateMetadata = async (): Promise<Metadata> => {
  const tDashboard = await getTranslations('candidates.dashboard');
  const tRegistration = await getTranslations('candidates.registration');

  return {
    title: tDashboard('registerLink'),
    description: tRegistration('pageDescription'),
  };
};

const RegisterCandidatePage = async () => {
  const initialExamWindows = getServerExamWindows();

  return (
    <main className={styles.page}>
      <RegistrationWizard initialExamWindows={initialExamWindows} />
    </main>
  );
};

export default RegisterCandidatePage;
