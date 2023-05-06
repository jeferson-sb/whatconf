import styles from './FeedListSkeleton.module.css'
import cx from 'clsx'

const FeedCardSkeleton = () => (
  <div className={styles.card}>
    <div className={styles.body}>
      <span className={cx([styles.category, styles.animationPulse])}></span>
      <span className={cx([styles.title, styles.animationPulse])}></span>
    </div>
  </div>
)

const FeedListSkeleton = () => (
  <div className={styles.list}>
    <FeedCardSkeleton />
    <FeedCardSkeleton />
  </div>
)

export { FeedListSkeleton }
