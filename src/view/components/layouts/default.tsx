import Head from 'next/head'
import { Nunito } from 'next/font/google'

import { Container } from '../container/Container'

import { Header } from '../header/Header'
import { Navbar } from '../navbar/Navbar'

const font = Nunito({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--next-ff',
})

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>WhatConf 👩‍💻👨‍💻 Never miss a tech conf again.</title>
        <meta
          name="description"
          content="WhatConf is a webapp to remind you of awesome developer talks happening across the globe."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Header />
        <Navbar />
      </Container>
      <main className={font.className}>{children}</main>
    </>
  )
}
