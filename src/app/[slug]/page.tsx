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
    description,
    keywords: [entry.title, productName, ...entry.properties.map(p => p.value), 'mobile development', 'case study'],
    openGraph: {
      description,
      images: [
        {
          alt: entry.title,
          height: entry.size === 'small' ? 289 : 594,
          url: entry.image,
          width: entry.size === 'small' ? 289 : 594,
        },
      ],
      title: entry.title,
      type: 'article',
    },
    title: entry.title,
    twitter: {
      card: 'summary_large_image',
      description,
      images: [entry.image],
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
    // own its scrolling — `data-page-scroll` hands touch panning back.
    <main data-page-scroll="true" className="relative h-full w-full overflow-x-hidden overflow-y-auto bg-[#08080b]">
      <PersonJsonLd />
      {/* The card is frosted glass: on the grid it blurs the portfolio behind
          it, so on its own page it needs something to catch or it reads as flat
          black. Slow drifting lights give it that, and the card picks the colour
          up through its own blur as they pass. */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Ellipses, not circles: they give the slow turn something to show, and
            three long axes crossing at different rates never repeat a shape. */}
        <div className="scene-light scene-light-a -top-[24%] left-[2%] h-[46vmax] w-[64vmax] bg-[#1b3fb5] opacity-[0.20]" />
        <div className="scene-light scene-light-b top-[26%] -right-[18%] h-[56vmax] w-[44vmax] bg-[#5b2bc9] opacity-[0.16]" />
        <div className="scene-light scene-light-c -bottom-[28%] left-[16%] h-[40vmax] w-[58vmax] bg-[#0f6f8c] opacity-[0.13]" />
        <div className="scene-grain absolute inset-0 opacity-[0.05]" />
        {/* Pulled down behind the card so the copy keeps its contrast, and down
            again at the edges — the light ends up pooling around the card. */}
        <div className="absolute inset-0 bg-[radial-gradient(46%_38%_at_50%_50%,rgba(0,0,0,0.8)_0%,transparent_80%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(88%_74%_at_50%_45%,transparent_34%,rgba(0,0,0,0.62)_100%)]" />
      </div>
      {/* Same place the expand control occupies in the modal — the corner on a
          desktop, the bottom of the screen on a phone — so crossing over only
          turns the arrows round. */}
      <CardCollapseLink />
      {/* Padding on the outside, the width cap on the inside: the card has to
          come out the exact size and place it is in the modal — same `py-10`,
          same 512, same margin under it on a phone — or the shared element
          scales its own text mid-flight and every line ghosts. That margin is
          also what keeps the last property clear of the pill down there. */}
      <div className="relative flex min-h-full w-full justify-center px-3 py-10 md:px-4">
        <div className="mb-[56px] flex w-full max-w-[512px] flex-col justify-center md:mb-0">
          <ShotDetail
            title={entry.title}
            image={entry.image}
            description={entry.description}
            properties={entry.properties}
            videos={entry.videos}
            size={entry.size}
          />
        </div>
      </div>
    </main>
  )
}
