import { type AppType } from 'next/app'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

import { trpc } from '../utils/trpc'
import '@/view/styles/reset.css'
import '@/view/styles/globals.css'

import Layout from '../view/components/layouts/default'
import { ToastProvider } from '@/view/components/toast/ToastProvider'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ToastProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ToastProvider>
    </SessionProvider>
  )
}

export default trpc.withTRPC(MyApp)
