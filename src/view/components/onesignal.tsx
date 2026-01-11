'use client'

import { env } from '@/env/env'
import { Session } from 'next-auth'
import { useEffect, useRef } from 'react'
import ReactOneSignal from 'react-onesignal'

const OneSignal = ({ session }: { session: Session | null }) => {
  const oneSignalInitiated = useRef<null | boolean>(null)

  useEffect(() => {
    if (oneSignalInitiated.current) return

    if (typeof window !== 'undefined') {
      ReactOneSignal.init({
        appId: env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
        safari_web_id: env.NEXT_PUBLIC_ONESIGNAL_SAFARI_ID,
        allowLocalhostAsSecureOrigin: true,
      })

      oneSignalInitiated.current = true
    }
  }, [])

  console.log('OneSignal! ', oneSignalInitiated.current)

  useEffect(() => {
    if (session?.user.id) ReactOneSignal.login(session?.user?.id)
  }, [session])

  return <></>
}

export { OneSignal }
