import {FC} from 'react'

import {EntryGallery} from '@/db'

export const CardGallery: FC<EntryGallery> = ({area}) => (
  <div
    className="w-full shrink-0 flex h-full contain-intrinsic overflow-hidden card-border-gradient"
    style={{gridArea: area, transformStyle: 'preserve-3d'}}
  >
    <div className="flex flex-col w-full grow overflow-hidden h-full items-center justify-center">{area}</div>
  </div>
)
