import {FC} from 'react'

import {EntryMap} from '@/db'

import {CardMapCartogram} from './card-map-cartogram'
import {CardMapCity} from './card-map-city'
import {CardMapLocation} from './card-map-location'

export const CardMap: FC<EntryMap> = ({area}) => (
  <div
    className="w-full shrink-0 flex h-full contain-intrinsic card-map-border-gradient overflow-hidden"
    style={{gridArea: area, transformStyle: 'preserve-3d'}}
  >
    <div className="flex flex-col w-full grow overflow-hidden h-full relative rounded-2xl">
      <CardMapCartogram>
        <CardMapLocation />
      </CardMapCartogram>
      <CardMapCity />
    </div>
  </div>
)
