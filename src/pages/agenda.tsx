import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

import { trpc } from '@/utils/trpc'
import { Container } from '@/view/components/container/Container'

import styles from './agenda.module.css'
import { AgendaCard } from '@/view/components/agenda'

const Agenda: NextPage = () => {
  const { data: sessionData } = useSession()
  const currentUser = sessionData?.user
  const agendaItems = trpc.reminder.agenda.useQuery(currentUser?.id)

  return (
    <Container>
      <h2>Your current agenda:</h2>
      <ul className={styles.list}>
        {!currentUser ? (
          <p>
            You are not authenticated yet.{' '}
            <Link href="/api/auth/signin">Click here to log in!</Link>
          </p>
        ) : agendaItems.data?.length ? (
          <>
            <h3 className={styles.upcoming}>Upcoming conferences</h3>
            {agendaItems.data.map((item, index) => (
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
