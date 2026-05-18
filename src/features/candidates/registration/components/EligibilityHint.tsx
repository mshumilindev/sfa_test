import type { EligibilityHint as EligibilityHintModel } from '@/features/candidates/registration/model/eligibilityHint';

import styles from './RegistrationSteps.module.scss';

type EligibilityHintProps = {
  hint: EligibilityHintModel;
};

export const EligibilityHint = ({ hint }: EligibilityHintProps) => (
  <aside aria-live="polite" className={`${styles.eligibilityHint} ${styles[hint.tone]}`}>
    <h2 className={styles.eligibilityTitle}>{hint.title}</h2>
    <p>{hint.message}</p>
  </aside>
);
