import type {Metadata} from 'next'

import {CardCollapseLink, CV, PersonJsonLd, SmoothScroll} from '@/components'

const description =
  'The full CV of Jan Blazej — work experience, side projects and education. Lead Mobile Developer specialising in React Native, Expo and TypeScript, based in Prague, Czechia.'

/**
 * Declared rather than inherited. Without this the page took the root's, which
 * pointed its canonical at `/` — telling a crawler the CV is the home page —
 * and gave a shared link the site's title and blurb instead of its own.
 *
 * The preview is the portfolio's, on purpose: the CV is a wall of body copy,
 * with nothing in it that survives being shrunk to a card.
 */
export const metadata: Metadata = {
  alternates: {
    canonical: '/cv',
  },
  description,
  keywords: [
    'Jan Blazej CV',
    'Jan Blazej resume',
    'Lead Mobile Developer CV',
    'React Native Developer CV',
    'Expo',
    'TypeScript',
    'Prague',
  ],
  openGraph: {
    description,
    images: [
      {
        alt: 'Jan Blazej - Lead Mobile Developer',
        height: 630,
        url: '/png/og-image.png',
        width: 1200,
      },
    ],
    locale: 'en_US',
    siteName: 'Jan Blazej Portfolio',
    title: 'CV — Jan Blazej',
    type: 'profile',
    url: '/cv',
  },
  title: 'CV',
  twitter: {
    card: 'summary_large_image',
    description,
    images: ['/png/og-image.png'],
    title: 'CV — Jan Blazej',
  },
}

export default async function Cv() {
  return (
    <>
      <PersonJsonLd />
      {/* Same spot the expand control occupies in the modal, so crossing over
          only turns the arrows round. Fixed, because the page is long — and
          outside the smoother, whose transform would carry it along. */}
      <CardCollapseLink />

      <SmoothScroll>
        <div className="relative flex w-full justify-center pt-[116px]">
          <div className="max-w-[572px] w-full flex flex-col items-center px-5">
            <CV animated>
              <div className="flex h-[116px] w-full flex-shrink-0" />
            </CV>
          </div>
        </div>
      </SmoothScroll>
    </>
  )
}
