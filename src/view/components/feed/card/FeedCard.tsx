import { useId } from 'react'

import { Conference } from '../../../../domain/Conference'
import { formattedDate } from '../../../formatters/date'
import { Bell, Clock, Link as LinkIcon, Pin } from '../../icons'
import styles from './FeedCard.module.css'

type FeedCardProps = Omit<Conference.Type, 'organizerId' | 'categoryId'> & {
  onSubscribe: () => void
}

const FeedCard = ({
  title,
  description,
  startDate,
  endDate,
  link,
  location,
  category,
  onSubscribe,
}: FeedCardProps) => {
  const formattedStartDate = formattedDate(startDate)
  const formattedEndDate = formattedDate(endDate)
  const id = useId()

  return (
    <div className={styles.card}>
      <div className={styles.body}>
        <span className={styles.category}>{category}</span>
        <p id={`card-title-${id}`} className={styles.title}>
          {title}
        </p>
        <div className={styles.details}>
          <small>
            <Clock width={20} height={20} /> {formattedStartDate} -{' '}
            {formattedEndDate}
          </small>
          <small title={location}>
            <Pin width={20} height={20} />
            <span>{location}</span>
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
          onClick={onSubscribe}
        >
          <Bell width={20} height={20} />
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
