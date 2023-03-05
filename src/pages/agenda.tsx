import type { NextPage } from 'next'

import { trpc } from '../utils/trpc'
import { Container } from '../view/components/container/Container'

import styles from './agenda.module.css'
import { AgendaCard } from '../view/components/agenda'

const Agenda: NextPage = () => {
  const user = trpc.user.all.useQuery()
  const currentUser = user?.data?.length ? user?.data[0] : null
  const agendaItems = trpc.reminder.agenda.useQuery(currentUser?.id)

  return (
    <Container>
      <h2>Your current agenda:</h2>
      <ul className={styles.list}>
        {!currentUser ? (
          <p>You need to be logged in!</p>
        ) : agendaItems.data?.length ? (
          <>
            <h3 className={styles.upcoming}>Upcoming conferences</h3>
            {agendaItems.data.map((item) => (
              <li key={item.id}>
                <AgendaCard event={item.event} />
              </li>
            ))}
          </>
        ) : (
          <p>You&apos;re not subscribed to any conference yet!</p>
        )}
      </ul>
    </Container>
  )
}

export default Agenda
