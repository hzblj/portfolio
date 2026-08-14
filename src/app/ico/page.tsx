import type {Metadata} from 'next'

import {IcoCard} from '@/components'
import {ico} from '@/db'

export const metadata: Metadata = {
  alternates: {
    canonical: '/ico',
  },
  description: `Business details of ${ico.name}, IČO ${ico.ico} — self-employed developer registered in Prague, Czechia.`,
  openGraph: {
    description: `Business details — IČO ${ico.ico}, ${ico.location}.`,
    title: `IČO ${ico.ico} · ${ico.name}`,
    url: 'https://janblazej.dev/ico',
  },
  title: 'IČO & Business Details',
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
        <div className="ico-scene-light ico-scene-light-a -top-[18%] left-[6%] size-[52vmax] bg-[#1c4bd8] opacity-[0.22]" />
        <div className="ico-scene-light ico-scene-light-b top-[34%] -right-[12%] size-[46vmax] bg-[#6a24d6] opacity-[0.18]" />
        <div className="ico-scene-light -bottom-[22%] left-[24%] size-[44vmax] bg-[#00a389] opacity-[0.14]" />
        <div className="ico-grain absolute inset-0 opacity-[0.06]" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_45%,transparent_0%,rgba(0,0,0,0.72)_100%)]" />
      </div>

      <div className="relative flex min-h-full w-full items-center justify-center px-5 py-[72px]">
        <IcoCard />
      </div>
    </main>
  )
}
