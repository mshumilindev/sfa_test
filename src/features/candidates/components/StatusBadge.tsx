import type { CandidateStatus } from '@/features/candidates/types/candidate';
import { statusLabels } from '@/features/candidates/utils/candidateDisplay';

import styles from './StatusBadge.module.scss';

type StatusBadgeProps = {
  status: CandidateStatus;
};

export const StatusBadge = ({ status }: StatusBadgeProps) => (
  <span className={`${styles.badge} ${styles[status]}`}>{statusLabels[status]}</span>
);
