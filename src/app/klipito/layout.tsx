import {type ReactNode} from 'react'

import {PageCloseLink} from '@/components'
import {AmbientWaves} from '@/scene/ambient/AmbientWaves'
import {AMBIENT_VARIANTS} from '@/scene/ambient/variants'
import {cn} from '@/utils'

type Props = Readonly<{
  children: ReactNode
}>

/**
 * Shared by the overview and both documents, so the light keeps moving instead
 * of restarting when one links to the other. The CV's ambient, since these are
 * pages of body copy too.
 */
export default function KlipitoLayout({children}: Props) {
  return (
    <main data-page-scroll="true" className="relative h-full w-full overflow-x-hidden overflow-y-auto bg-[#08080b]">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden bg-[#08080b]">
        <AmbientWaves variant="cv" />
        <div className="scene-grain absolute inset-0 opacity-[0.05]" />
        {AMBIENT_VARIANTS.cv.vignettes.map(vignette => (
          <div key={vignette} className={cn('absolute inset-0', vignette)} />
        ))}
      </div>

      <PageCloseLink />

      <div className="relative flex w-full justify-center px-[44px] pt-[116px] pb-[140px] md:px-0">
        <article className="flex w-full max-w-[572px] flex-col gap-[56px]">{children}</article>
      </div>
    </main>
  )
}
