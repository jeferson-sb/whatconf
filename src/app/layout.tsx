import { type Metadata } from "next";
import { Nunito } from 'next/font/google'

import '@/view/styles/reset.css'
import '@/view/styles/globals.css'

import { TRPCReactProvider } from "@/trpc/react";
import { Container } from "@/view/components/container/Container";
import { Header } from "@/view/components/header/Header";
import { Navbar } from "@/view/components/navbar/Navbar";
import { ToastProvider } from "@/view/components/toast/ToastProvider";

export const metadata: Metadata = {
  title: "WhatConf 👩‍💻👨‍💻 Never miss a tech conf again.",
  description: "WhatConf is a webapp to remind you of awesome developer talks happening across the globe.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const font = Nunito({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--next-ff',
})

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <TRPCReactProvider>
            <>
              <Container>
                <Header />
                <Navbar />
              </Container>
              <main className={font.className}>{children}</main>
            </>
          </TRPCReactProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
