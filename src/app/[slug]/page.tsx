import {notFound} from 'next/navigation'

import {ShotDetail} from '@/components'
import {getEntryBySlug} from '@/db'

type Props = {
  params: Promise<{slug: string}>
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
        <div className="max-w-[512px] w-full">
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
    )
  }

  return notFound()
}
