import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

import {CardCollapseLink, PersonJsonLd, ShotDetail} from '@/components'
import {entries, getEntryBySlug} from '@/db'

type Props = {
  params: Promise<{slug: string}>
}

export async function generateStaticParams() {
  return entries
    .filter(entry => entry.variant === 'shot')
    .map(entry => ({
      slug: entry.slug,
    }))
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params
  const entry = getEntryBySlug(slug)

  if (!entry || entry.variant !== 'shot') {
    return {
      title: 'Not Found',
    }
  }

  const productName = entry.properties.find(p => p.name === 'Product')?.value || entry.title
  const description = entry.description.slice(0, 160) + (entry.description.length > 160 ? '...' : '')

  return {
    // Without this every case study inherits the root's `/`, which tells a
    // crawler that all thirty-odd of them are the same page as the home page.
    alternates: {
      canonical: `/${slug}`,
    },
    description,
    keywords: [entry.title, productName, ...entry.properties.map(p => p.value), 'mobile development', 'case study'],
    openGraph: {
      description,
      // `og:image` comes from `opengraph-image.tsx` beside this file: the
      // shot's own artwork, laid out for the 1.91:1 a social card crops to.
      // Naming the source file here instead would hand every platform a 4:3
      // photograph to cut a strip out of.
      locale: 'en_US',
      siteName: 'Jan Blazej Portfolio',
      title: entry.title,
      type: 'article',
      url: `/${slug}`,
    },
    title: entry.title,
    twitter: {
      card: 'summary_large_image',
      description,
      title: entry.title,
    },
  }
}

export default async function SlugPage({params}: Props) {
  const {slug} = await params
  const entry = getEntryBySlug(slug)

  if (!entry || entry.variant !== 'shot') {
    notFound()
  }

  return (
    // html/body are locked for the camera on `/`, so a standalone page has to
    // own its scrolling — `data-page-scroll` hands touch panning back. The
    // ambient light behind it belongs to the home layout, which keeps the same
    // one alive across the hand-over from an open card.
    <main data-page-scroll="true" className="relative h-full w-full overflow-x-hidden overflow-y-auto">
      <PersonJsonLd />
      {/* Same place the expand control occupies in the modal — the corner on a
          desktop, the bottom of the screen on a phone — so crossing over only
          turns the arrows round. */}
      <CardCollapseLink />
      {/* Laid out like the CV: one column on the ambient, started below the top
          edge rather than centred in the screen, so a long shot and a short one
          both begin in the same place.

          The column is the open card's box down to the padding — same 12px
          margin, same 512 cap, same inset — and starts at `PAGE_TOP` in the
          scene's morph state. The grid slides the open card's content up to
          exactly here before it hands over, so the page arrives under an
          identical frame and the swap cannot be seen. */}
      <div className="relative flex min-h-full w-full justify-center px-3 pt-[116px] md:px-0">
        <div className="flex w-full max-w-[512px] flex-col px-[20px] md:px-8">
          <ShotDetail
            title={entry.title}
            image={entry.image}
            description={entry.description}
            properties={entry.properties}
            videos={entry.videos}
            size={entry.size}
          />
          {/* Keeps the last property clear of the pill on the bottom edge. */}
          <div className="flex h-[116px] w-full flex-shrink-0" />
        </div>
      </div>
    </main>
  )
}
