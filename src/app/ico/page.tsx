import type {Metadata} from 'next'

import {IcoCard, PageCloseLink} from '@/components'
import {ico} from '@/db'

/**
 * A headless render of the live card itself, so the social preview keeps the
 * frosted glass, the waves and the metal ring that CSS-in-SVG can't reproduce.
 * To refresh it, screenshot /ico in a 720×378 viewport at a 1.667 device pixel
 * ratio with everything below the card hidden, emulating reduced motion and
 * keeping the pointer off the card — that renders it flat and unhovered. The
 * padding on the card's container has to go with the records it was leaving
 * room for, or the card sits low in the frame instead of in the middle of it.
 *
 * Being a render of the live card, it goes stale whenever the card changes.
 */
const ogImage = {
  alt: `IČO ${ico.ico} · ${ico.name}`,
  height: 630,
  url: '/png/og-ico.png',
  width: 1200,
}

export const metadata: Metadata = {
  alternates: {
    canonical: '/ico',
  },
  description: `Business details of ${ico.name}, IČO ${ico.ico} — self-employed developer registered in Prague, Czechia.`,
  // Overrides the site-wide keywords: this page is about the sole
  // proprietorship, so it shouldn't carry employer or portfolio terms.
  keywords: [
    `IČO ${ico.ico}`,
    ico.name,
    'IČO',
    'DIČ',
    'fakturační údaje',
    'billing details',
    'business ID',
    'OSVČ',
    'freelance developer Prague',
    'ARES',
  ],
  openGraph: {
    description: `Business details — IČO ${ico.ico}, ${ico.location}.`,
    images: [ogImage],
    title: `IČO ${ico.ico} · ${ico.name}`,
    url: 'https://janblazej.dev/ico',
  },
  title: 'IČO & Business Details',
  twitter: {
    card: 'summary_large_image',
    description: `Business details — IČO ${ico.ico}, ${ico.location}.`,
    images: [ogImage.url],
    title: `IČO ${ico.ico} · ${ico.name}`,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CZ',
    addressLocality: 'Praha',
  },
  founder: {'@type': 'Person', name: ico.name},
  foundingDate: '2019-08-26',
  identifier: {
    '@type': 'PropertyValue',
    propertyID: 'ICO',
    value: ico.ico,
  },
  name: ico.name,
  url: 'https://janblazej.dev/ico',
}

export default function Ico() {
  return (
    <main data-page-scroll="true" className="relative h-full w-full overflow-x-hidden overflow-y-auto bg-black">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />

      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* The colour is the text colour: the glow is a gradient of
            `currentColor`, not a fill — see `.scene-light` in app.css. */}
        <div className="scene-light scene-light-a -top-[18%] left-[6%] size-[52vmax] text-[#1c4bd8] opacity-[0.22]" />
        <div className="scene-light scene-light-b top-[34%] -right-[12%] size-[46vmax] text-[#6a24d6] opacity-[0.18]" />
        <div className="scene-light -bottom-[22%] left-[24%] size-[44vmax] text-[#00a389] opacity-[0.14]" />
        <div className="scene-grain absolute inset-0 opacity-[0.06]" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_45%,transparent_0%,rgba(0,0,0,0.72)_100%)]" />
      </div>

      {/* Off the corner and onto the bottom edge on phones, where the card fills
          the screen and the top of it is out of a thumb's reach. */}
      <PageCloseLink />

      <div className="relative flex min-h-full w-full items-center justify-center px-5 py-[72px]">
        <IcoCard />
      </div>
    </main>
  )
}
