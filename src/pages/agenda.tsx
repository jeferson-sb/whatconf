import type { NextPage } from 'next'
import { trpc } from '../utils/trpc'
import { Container } from '../view/components/container/Container'
import { shortDateFormatted } from './formatters'

import styles from './agenda.module.css'

const Agenda: NextPage = () => {
  const events = trpc.conference.all.useQuery()
  const reminders = trpc.reminder.all.useQuery()

  // TODO: refactor to find by id inside router instead.
  const items = reminders?.data?.map((reminder) => {
    const conf = events?.data?.find((event) => event.id === reminder.eventId)
    return conf
  })

  return (
    <Container>
      <h2>Your current agenda:</h2>
      <ul className={styles.list}>
        {items?.map((item) => (
          <li key={item?.id}>
            <div className={styles.card}>
              <div className={styles.dates}>
                <time dateTime={item?.startDate.toISOString()}>
                  {shortDateFormatted(item?.startDate)}
                </time>
                <hr className={styles.divider} />
                <time dateTime={item.startDate.toISOString()}>
                  {shortDateFormatted(item?.endDate)}
                </time>
              </div>
              <div className={styles.details}>
                <h3>{item?.title}</h3>
                <p>{item?.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  )
}

export default Agenda
