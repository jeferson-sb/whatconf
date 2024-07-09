import { useCallback, useMemo, useState } from 'react'
import { type NextPage } from 'next'
import Link from 'next/link'
import dayjs from 'dayjs'

import styles from './year.module.css'

import { isProd } from '@/lib/detectEnv'
import { trpc } from '@/utils/trpc'
import { useAuth } from '@/hook/useAuth'
import { useToast } from '@/hook/useToast'
import { type Conference } from '@/domain/Conference'

import { Container } from '@/view/components/container/Container'
import { Avatar } from '@/view/components/avatar'
import { FeedList, FeedListSkeleton } from '@/view/components/feed'
import { Button } from '@/view/components/base/button/Button'

import { AlertDialog } from '@/view/components/base/dialog'
import { Plus } from '@/view/components/icons'

const FeedYear: NextPage = () => {
  const eventsQuery = trpc.conference.yearly.useQuery()
  const categories = trpc.category.all.useQuery()
  const reminder = trpc.reminder.create.useMutation()
  const api = trpc.useUtils()

  const { isAuthenticated, session, signIn, signOut } = useAuth()
  const { showToast } = useToast()

  const events = useMemo(
    () =>
      eventsQuery?.data
        ?.map((event) => ({
          ...event,
          category: categories?.data?.find((ctg) => ctg.id === event.categoryId)
            ?.name,
        }))
        .sort((a, b) => (a.startDate > b.startDate ? 1 : -1)),
    [categories]
  )

  const [isSubscribeDialogOpen, setSubscribeDialog] = useState(false)

  const handleSubscribe = useCallback(async (event: Conference.Type) => {
    try {
      const currentUser = session?.user
      const isPast = dayjs().isAfter(event.endDate)

      if (!currentUser || !isAuthenticated) {
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

      const userId = currentUser?.id

      const existingReminder = await api.reminder.getByEvent.fetch({
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

      reminder.mutate({ userId, eventId: event.id })

      showToast({
        type: 'success',
        title: 'Subscribed!',
        description:
          "You're now subscribed and will be notified a day before the event starts!",
      })
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Failed to subscribe user to conference', error)
      }
    }
  }, [])

  return (
    <Container>
      <section className={styles.feed}>
        <AlertDialog
          open={isSubscribeDialogOpen}
          onOpenChange={setSubscribeDialog}
          title="✋ You can't do that yet"
          description="You need to be authenticated to be able to subscribe, see your agenda and receive notifications for a conference. It takes just two clicks! "
        >
          <div className={styles['dialog-actions']}>
            <Button type="button" onClick={() => signIn()}>
              Sign up now!
            </Button>
          </div>
        </AlertDialog>

        <div className={styles.controls}>
          <Button as={Link} href="/create" colorScheme="gray">
            <Plus /> <span>Submit a conf</span>
          </Button>
          {isAuthenticated ? (
            <div className={styles.menu}>
              <Avatar user={session?.user} />
              <Button type="button" variant="cutted" onClick={() => signOut()}>
                Logout
              </Button>
            </div>
          ) : (
            <Button type="button" variant="outline" onClick={() => signIn()}>
              Sign in
            </Button>
          )}
        </div>

        {eventsQuery.isLoading ? (
          <FeedListSkeleton />
        ) : eventsQuery?.data?.length ? (
          <FeedList events={events} onSubscribe={handleSubscribe} />
        ) : null}
      </section>
    </Container>
  )
}

export default FeedYear
