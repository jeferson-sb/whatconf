import { type NextPage } from 'next'
import Link from 'next/link'

import { trpc } from '../utils/trpc'
import { Button } from '../view/components/base/button/Button'
import { Container } from '../view/components/container/Container'
import { FeedList } from '../view/components/feed'
import { Plus } from '../view/components/icons'

import styles from './index.module.css'

const Home: NextPage = () => {
  const events = trpc.conference.all.useQuery()

  return (
    <Container>
      <section className={styles.feed}>
        <Button as={Link} href="/create">
          <Plus /> <span>Submit a conf</span>
        </Button>
        {events.isLoading ? (
          <p>Loading...</p>
        ) : events?.data?.length ? (
          <FeedList events={events.data} />
        ) : null}
      </section>
    </Container>
  )
}

export default Home
