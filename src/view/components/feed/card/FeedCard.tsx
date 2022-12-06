import { useId } from 'react'

import { Conference } from '../../../../domain/Conference'
import { Clock, Link as LinkIcon, Pin } from '../../icons'
import styles from './FeedCard.module.css'

type FeedCardProps = Omit<Conference.Type, 'organizerId' | 'categoryId'>

const formattedDate = (date) =>
  new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(date)

const FeedCard = ({
  title,
  description,
  startDate,
  endDate,
  link,
  location,
}: FeedCardProps) => {
  const formattedStartDate = formattedDate(startDate)
  const formattedEndDate = formattedDate(endDate)
  const id = useId()

  return (
    <div className={styles.card}>
      <div className={styles.body}>
        <p id={`card-title-${id}`} className={styles.title}>
          {title}
        </p>
        <div className={styles.details}>
          <small>
            <Clock width={20} height={20} /> {formattedStartDate} -{' '}
            {formattedEndDate}
          </small>
          <small>
            <Pin width={20} height={20} /> {location}
          </small>
        </div>
        <p>{description}</p>
      </div>
      <div className={styles.actions}>
        <button
          id={`button-${id}`}
          type="button"
          aria-labelledby={`button-${id} card-title-${id}`}
          className={styles.button}
        >
          Subscribe
        </button>
        <a
          href={link}
          className={styles.link}
          rel="noopener noreferrer"
          target="_blank"
        >
          <LinkIcon width={20} height={20} />
          Link
        </a>
      </div>
    </div>
  )
}

export { FeedCard }
export type { FeedCardProps }
