import { useMemo } from 'react'
import dayjs from 'dayjs'
import cx from 'clsx'

import type { Conference } from '@/domain/Conference'
import styles from './AgendaCard.module.css'

import { shortDateFormatted } from '@/view/formatters/date'

type AgendaCardProps = {
  event: Omit<Conference.Type, 'organizerId'>
}

const AgendaCard = ({ event }: AgendaCardProps) => {
  const today = dayjs()

  const isLive = useMemo(() => {
    const diff = today.diff(event.startDate, 'day') - 1

    return diff === 0
  }, [])

  const isPast = dayjs().isAfter(event.endDate)

  const classes = cx({
    [styles.card as string]: true,
    [styles['card-past'] as string]: isPast,
  })

  return (
    <div className={classes}>
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
        <div className={styles.header}>
          <h3>{event.title}</h3>
          {isPast && <span className={styles.ended}>Ended</span>}
        </div>
        <p>{event.description}</p>
      </div>
      {isLive && (
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
