import { useMemo } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'

import styles from './agenda.module.css'

import { trpc } from '@/utils/trpc'
import { useAuth } from '@/hook/useAuth'

import { Container } from '@/view/components/container/Container'
import { AgendaCard } from '@/view/components/agenda'

const Agenda: NextPage = () => {
  const { isAuthenticated, isUnauthenticated, session } = useAuth()
  const currentUser = session?.user
  const agendaItems = trpc.reminder.agenda.useQuery(currentUser?.id, {
    enabled: isAuthenticated,
  })

  const sorted = useMemo(
    () =>
      agendaItems?.data?.sort((a, b) =>
        a.event.startDate > b.event.startDate ? 1 : -1
      ),
    [agendaItems]
  )

  return (
    <Container>
      <h2>Your current agenda:</h2>
      <ul className={styles.list}>
        {isUnauthenticated ? (
          <p>
            You are not authenticated yet.{' '}
            <Link href="/api/auth/signin">Click here to log in!</Link>
          </p>
        ) : sorted?.length ? (
          <>
            <h3 className={styles.upcoming}>Upcoming conferences</h3>
            {sorted.map((item, index) => (
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
