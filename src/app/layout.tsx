import './globals.css'

import type {Metadata} from 'next'
import {type ReactNode} from 'react'

export const metadata: Metadata = {
  description: 'Portfolio of Hobl',
  title: 'Hobl',
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
