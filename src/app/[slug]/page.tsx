import type {Metadata} from 'next'
import Link from 'next/link'
import {notFound} from 'next/navigation'

import {ShotDetail} from '@/components'
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

  if (!entry) {
    notFound()
  }

  if (entry.variant === 'shot') {
    return (
      <div className="w-full min-h-screen flex items-center justify-center p-4">
        <div className="max-w-[600px] w-full">
          <div className="card-modal">
            <div className="mb-4 px-[20px] md:px-8 pt-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[14px] font-medium text-white/70 hover:text-white transition-colors duration-300"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="rotate-180"
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Back to Home
              </Link>
            </div>
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
      </div>
    )
  }

  return notFound()
}
