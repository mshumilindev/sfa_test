import styles from './CandidateDashboardSkeleton.module.scss';

const skeletonRows = Array.from({ length: 5 }, (_, index) => index);

export const CandidateDashboardSkeleton = () => (
  <div aria-hidden="true" className={styles.skeleton} data-testid="candidate-dashboard-skeleton">
    <div className={styles.table}>
      <div className={styles.tableHeader}>
        <span className={styles.block} />
        <span className={styles.block} />
        <span className={styles.block} />
        <span className={styles.block} />
        <span className={styles.block} />
      </div>
      {skeletonRows.map((row) => (
        <div className={styles.tableRow} key={row}>
          <span className={styles.block} />
          <span className={styles.block} />
          <span className={styles.block} />
          <span className={styles.block} />
          <span className={styles.block} />
        </div>
      ))}
    </div>

    <ul className={styles.cardList}>
      {skeletonRows.map((row) => (
        <li className={styles.card} key={row}>
          <div className={styles.cardHeader}>
            <span className={styles.blockWide} />
            <span className={styles.badge} />
          </div>
          <div className={styles.cardLine} />
          <div className={styles.cardLine} />
          <div className={styles.cardLine} />
        </li>
      ))}
    </ul>
  </div>
);
