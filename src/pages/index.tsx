import { type NextPage } from 'next'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getToken, getMessaging } from 'firebase/messaging'
import firebase from 'firebase/compat/app'

import { trpc } from '../utils/trpc'
import { type Conference } from '../domain/Conference'
import { Button } from '@/view/components/base/button/Button'
import { Container } from '@/view/components/container/Container'
import { FeedList, FeedListSkeleton } from '@/view/components/feed'
import { Plus } from '@/view/components/icons'
import { Avatar } from '@/view/components/avatar'
import { AlertDialog } from '@/view/components/base/dialog'

import { vapidKey } from '@/lib/firebase'

import styles from './index.module.css'
import { useAuth } from '@/hook/useAuth'
import { useToast } from '@/hook/useToast'
import { isProd } from '@/lib/detectEnv'

const Home: NextPage = () => {
  const eventsQuery = trpc.conference.all.useQuery()
  const categories = trpc.category.all.useQuery()
  const reminder = trpc.reminder.create.useMutation()

  const { isAuthenticated, session, signIn, signOut } = useAuth()
  const { showToast } = useToast()

  const events = useMemo(
    () =>
      eventsQuery?.data
        ?.filter((event) => event.endDate > new Date())
        ?.map((event) => ({
          ...event,
          category: categories?.data?.find((ctg) => ctg.id === event.categoryId)
            ?.name,
        }))
        .sort((a, b) => (a.startDate > b.startDate ? 1 : -1)),
    [categories]
  )

  const [isSubscribeDialogOpen, setSubscribeDialog] = useState(false)

  const handleSignIn = () => signIn()

  const handleLogout = () => signOut()

  const enableNotifications = useCallback(async () => {
    try {
      const status = await Notification.requestPermission()

      if (status === 'granted' && isProd()) {
        const messagingService = getMessaging(firebase.apps[0])

        const fcm = await getToken(messagingService, { vapidKey })
        window.localStorage.setItem('@whatconf/fcm', JSON.stringify(fcm))
      }
    } catch (error) {
      console.error('An error occurred while retrieving token.', error)
    }
  }, [])

  const handleSubscribe = useCallback(async (event: Conference.Type) => {
    try {
      const currentUser = session?.user

      if (!currentUser || !isAuthenticated) {
        return setSubscribeDialog(true)
      }

      const userId = currentUser?.id

      reminder.mutate({ userId, eventId: event.id })

      // if (isProd()) {
      //   const fcmToken = window.localStorage.getItem('@whatconf/fcm') ?? ''
      //   const response = await fetch('/api/subscribe', {
      //     body: JSON.stringify({ fcmToken, event }),
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   })
      //   const data = await response.json()
      // }

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

  useEffect(() => {
    enableNotifications()
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
            <Button type="button" onClick={handleSignIn}>
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
              <Button type="button" variant="cutted" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button type="button" variant="outline" onClick={handleSignIn}>
              Sign in
            </Button>
          )}
        </div>

        {eventsQuery.isLoading ? (
          <FeedListSkeleton />
        ) : events && events?.length > 0 ? (
          <FeedList events={events} onSubscribe={handleSubscribe} />
        ) : (
          <p>
            No upcoming events has been registered from this date, check the
            conferences from <Link href="/year">this year.</Link>
          </p>
        )}
      </section>
    </Container>
  )
}

export default Home
