import { api, HydrateClient } from '@/trpc/server'
import Link from 'next/link'

import styles from './index.module.css'

import { auth } from '@/server/auth'

import { FeedList } from '@/view/components/feed'
import { Container } from '@/view/components/container/Container'
import { ControlsBar } from '@/view/components/controls-bar/ControlsBar'
import { OneSignal } from '@/view/components/onesignal'
import { reminderPerEvent, remindMe } from './actions'

const Home = async () => {
  const conferences = await api.conference.all()
  const categories = await api.category.all()
  const session = await auth()

  const allConferences = conferences
    ?.filter((event) => event.endDate > new Date())
    ?.map((event) => ({
      ...event,
      category: categories?.find((ctg) => ctg.id === event.categoryId)?.name,
    }))
    .sort((a, b) => (a.startDate > b.startDate ? 1 : -1))

  return (
    <HydrateClient>
      <Container>
        <OneSignal session={session} />
        <section className={styles.feed}>
          <ControlsBar session={session} />

          {allConferences && allConferences?.length > 0 ? (
            <FeedList
              events={allConferences}
              session={session}
              remindPerEvent={reminderPerEvent}
              remindMe={remindMe}
            />
          ) : (
            <p>
              No upcoming events has been registered from this date, check the
              conferences from <Link href='/year'>this year.</Link>
            </p>
          )}
        </section>
      </Container>
    </HydrateClient>
  )
}

export default Home
