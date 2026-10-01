import type {Metadata} from 'next'

import {Config} from '@/config'
import {klipito} from '@/db'

const logo = {
  alt: `${klipito.name} logo`,
  height: 512,
  url: klipito.logo,
  width: 512,
}

/**
 * Its own name rather than the portfolio's: a reviewer opening one of these is
 * looking at the app, and a shared link should say so. The square logo is the
 * preview, hence the small card.
 */
export const klipitoMetadata = ({
  path,
  title,
  description,
}: {
  path: string
  title: string
  description: string
}): Metadata => ({
  alternates: {
    canonical: path,
  },
  description,
  openGraph: {
    description,
    images: [logo],
    siteName: klipito.name,
    title,
    type: 'website',
    url: `${Config.site}${path}`,
  },
  title: {absolute: title},
  twitter: {
    card: 'summary',
    description,
    images: [logo.url],
    title,
  },
})
