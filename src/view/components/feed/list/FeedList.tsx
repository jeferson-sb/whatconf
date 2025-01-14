'use client'

import { useState } from 'react'
import { Session } from 'next-auth'
import dayjs from 'dayjs'

import { Conference } from '@/domain/Conference'
import { FeedCard } from '../card/FeedCard'
import styles from './FeedList.module.css'
import { SubscribeDialog } from '@/view/components/subscribe/SubscribeDialog'
import { useToast } from '@/hook/useToast'
import { reminderPerEvent, remindMe } from '@/app/actions'

type FeedListProps = {
  events: Conference.Type[]
  session: Session | null
}

const FeedList = ({ events, session }: FeedListProps) => {
  const { showToast } = useToast()
  const [isSubscribeDialogOpen, setSubscribeDialog] = useState(false)
  const onSubscribe = async (event: Conference.Type) => {
    const currentUser = session?.user
    const isPast = dayjs().isAfter(event.endDate)

    if (!currentUser) {
      return setSubscribeDialog(true)
    }

    if (isPast) {
      showToast({
        type: 'error',
        title: 'You cannot subscribe to a past conference',
        placement: 'bottom-right',
      })
      return
    }

    try {
      const userId = currentUser?.id
      const existingReminder = await reminderPerEvent({
        userId,
        eventId: event.id,
      })

      if (existingReminder) {
        showToast({
          type: 'error',
          title: 'You are already subscribed to this event',
          placement: 'bottom-right',
        })
        return
      }

      await remindMe({ userId, eventId: event.id })

      showToast({
        type: 'success',
        title: 'Subscribed!',
        description: "You've added the event to your agenda!",
      })
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Failed to subscribe user to conference', error)
      }
    }
  }

  return (
    <>
      <SubscribeDialog
        dialogOpen={isSubscribeDialogOpen}
        onOpenChange={setSubscribeDialog}
      />

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
            category={event.category}
            onSubscribe={() => onSubscribe(event)}
          />
        ))}
      </div>
    </>
  )
}

export { FeedList }
export type { FeedListProps }
