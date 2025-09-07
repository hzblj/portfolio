import {Inter} from 'next/font/google'

import './app.css'

import type {Metadata} from 'next'
import {type ReactNode} from 'react'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'Jan Blazej - Lead Mobile Developer & Founder',
}

type Props = Readonly<{
  children: ReactNode
}>

export default function RootLayout({children}: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
