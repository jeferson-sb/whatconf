import { api } from '@/trpc/server'

import styles from './year.module.css'

import { Container } from '@/view/components/container/Container'
import { FeedList } from '@/view/components/feed'
import { ControlsBar } from '@/view/components/controls-bar/ControlsBar'
import { auth } from '@/server/auth'

const Year = async () => {
  const conferences = await api.conference.yearly()
  const categories = await api.category.all()
  
  const session = await auth();

  const events = conferences
    ?.map((event) => ({
      ...event,
      category: categories?.find((ctg) => ctg.id === event.categoryId)?.name,
    }))
    .sort((a, b) => (a.startDate > b.startDate ? 1 : -1))

  return (
    <Container>
      <section className={styles.feed}>
        <ControlsBar session={session} />

        {conferences.length > 0 && <FeedList events={events} session={session} />}
      </section>
    </Container>
  )
}

export default Year
