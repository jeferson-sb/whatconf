import { type NextPage } from 'next'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { getToken, getMessaging } from 'firebase/messaging'
import firebase from 'firebase/compat/app'
import { signIn, signOut, useSession } from 'next-auth/react'

import { trpc } from '../utils/trpc'
import { type Conference } from '../domain/Conference'
import { Button } from '@/view/components/base/button/Button'
import { Container } from '@/view/components/container/Container'
import { FeedList } from '@/view/components/feed'
import { Plus } from '@/view/components/icons'
import { Avatar } from '@/view/components/avatar'
import { AlertDialog } from '@/view/components/base/dialog'

import { isProd } from '@/lib/detectEnv'
import { vapidKey } from '@/lib/firebase'

import styles from './index.module.css'

const Home: NextPage = () => {
  const events = trpc.conference.all.useQuery()
  const reminder = trpc.reminder.create.useMutation()

  const { data: sessionData } = useSession()
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
      const currentUser = sessionData?.user

      if (!currentUser) {
        return setSubscribeDialog(true)
      }

      const userId = currentUser?.id

      reminder.mutate({ userId, eventId: event.id })

      if (isProd()) {
        const fcmToken = window.localStorage.getItem('@whatconf/fcm') ?? ''
        const response = await fetch('/api/subscribe', {
          body: JSON.stringify({ fcmToken, event }),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const data = await response.json()
      }

      // TODO: Replace with an alert component
      alert(
        `You're now subscribed to ${event.title} and should receive notifications when the event starts!`
      )
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
          <Button as={Link} href="/create">
            <Plus /> <span>Submit a conf</span>
          </Button>
          {sessionData ? (
            <div className={styles.menu}>
              <Avatar user={sessionData?.user} />
              <Button type="button" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button type="button" variant="outline" onClick={handleSignIn}>
              Sign in
            </Button>
          )}
        </div>

        {events.isLoading ? (
          <p>Loading...</p>
        ) : events?.data?.length ? (
          <FeedList events={events.data} onSubscribe={handleSubscribe} />
        ) : null}
      </section>
    </Container>
  )
}

export default Home
