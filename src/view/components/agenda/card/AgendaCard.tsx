import dayjs from 'dayjs'

import type { Conference } from '../../../../domain/Conference'
import { shortDateFormatted } from '../../../formatters'
import styles from './AgendaCard.module.css'

type AgendaCardProps = {
  event: Omit<Conference.Type, 'organizerId'>
}

const AgendaCard = ({ event }: AgendaCardProps) => {
  const isLive = (startDate: Date) => {
    const today = dayjs()
    const diff = today.diff(startDate, 'day') - 1

    return diff === 0
  }

  return (
    <div className={styles.card}>
      <div className={styles.dates}>
        <time dateTime={event.startDate.toISOString()}>
          {shortDateFormatted(event.startDate)}
        </time>
        <hr className={styles.divider} />
        <time dateTime={event.startDate.toISOString()}>
          {shortDateFormatted(event.endDate)}
        </time>
      </div>
      <div className={styles.details}>
        <h3>{event.title}</h3>
        <p>{event.description}</p>
      </div>
      {isLive(event.startDate) && (
        <div className={styles.live}>
          <span>Live</span>
          <span className={styles.dot}></span>
        </div>
      )}
    </div>
  )
}

export { AgendaCard }
export type { AgendaCardProps }
