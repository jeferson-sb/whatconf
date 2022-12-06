import { type NextPage } from 'next'

import { trpc } from '../utils/trpc'
import { Container } from '../view/components/container/Container'
import { FeedList } from '../view/components/feed'

import styles from './index.module.css'

const Home: NextPage = () => {
  const events = trpc.conference.all.useQuery()

  return (
    <Container>
      <section className={styles.feed}>
        {events.isLoading ? (
          <p>Loading...</p>
        ) : events.data ? (
          <FeedList events={events.data} />
        ) : null}
      </section>
    </Container>
  )
}

export default Home
