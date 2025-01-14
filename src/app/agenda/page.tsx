import { api } from '@/trpc/server'

import styles from './agenda.module.css'

import { Container } from '@/view/components/container/Container'
import { AgendaCard } from '@/view/components/agenda'
import Link from 'next/link'
import { auth } from '@/server/auth'

const Agenda = async () => {
  const session = await auth();
  const currentUser = session?.user

  const userId = currentUser?.id
  const agenda = await api.reminder.agenda(userId)
  const items = agenda?.sort((a, b) =>
    a.event.startDate > b.event.startDate ? 1 : -1
  )

  return (
    <Container>
       <h2>Your current agenda:</h2>
       <ul className={styles.list}>
        {!session?.user ? (
          <p>
            You are not authenticated yet.{' '}
            <Link href='/api/auth/signin'>Click here to log in!</Link>
          </p>
        ) : items?.length ? (
          <>
            <h3 className={styles.upcoming}>Upcoming conferences</h3>
            {items.map((item, index) => (
              <li key={item.id} style={{ '--order': index }}>
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
