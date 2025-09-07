import './globals.css'

import type {Metadata} from 'next'
import {type ReactNode} from 'react'

export const metadata: Metadata = {
  title: 'Jan Blazej - Lead Mobile Developer & Founder',
}

type Props = Readonly<{
  children: ReactNode
}>

export default function RootLayout({children}: Props) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
