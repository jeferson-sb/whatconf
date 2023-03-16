import { Conference } from '../../../../domain/Conference'
import { FeedCard } from '../card/FeedCard'
import styles from './FeedList.module.css'

type FeedListProps = {
  events: Conference.Type[]
  onSubscribe: (event: Conference.Type) => void
}

const FeedList = ({ events, onSubscribe }: FeedListProps) => (
  <div className={styles.list}>
    {events.map((event) => (
      <FeedCard
        key={event.id}
        title={event.title}
        virtual={event.virtual}
        startDate={event.startDate}
        endDate={event.endDate}
        description={event.description}
        link={event.link}
        location={event.location}
        onSubscribe={() => onSubscribe(event)}
      />
    ))}
  </div>
)

export { FeedList }
export type { FeedListProps }
