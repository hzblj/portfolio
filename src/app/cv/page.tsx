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
      {/* Both of these stay outside the smoother: it moves its content with a
          transform, and anything `fixed` inside would ride along with it.

          Same ambient as the project pages, held back a stop — this one is a
          wall of body copy rather than a card, so the light stays at the edges. */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden bg-[#08080b]">
        {/* The colour is the text colour: the glow is a gradient of
            `currentColor`, not a fill — see `.scene-light` in app.css. */}
        <div className="scene-light scene-light-a -top-[26%] -left-[8%] h-[46vmax] w-[64vmax] text-[#1b3fb5] opacity-[0.16]" />
        <div className="scene-light scene-light-b top-[22%] -right-[22%] h-[56vmax] w-[44vmax] text-[#5b2bc9] opacity-[0.13]" />
        <div className="scene-light scene-light-c -bottom-[30%] left-[10%] h-[40vmax] w-[58vmax] text-[#0f6f8c] opacity-[0.10]" />
        <div className="scene-grain absolute inset-0 opacity-[0.05]" />
        <div className="absolute inset-0 bg-[radial-gradient(52%_60%_at_50%_50%,rgba(0,0,0,0.86)_0%,transparent_82%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(92%_80%_at_50%_45%,transparent_38%,rgba(0,0,0,0.6)_100%)]" />
      </div>
      {/* Same spot the expand control occupies in the modal, so crossing over
          only turns the arrows round. Fixed, because the page is long. */}
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
