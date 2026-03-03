'use client'

import {FC, useRef} from 'react'

import {EntryMap} from '@/db'
import {useEntranceAnimation} from '@/hooks'

import {CardMapCartogram} from './card-map-cartogram'
import {CardMapCity} from './card-map-city'
import {CardMapLocation} from './card-map-location'

export const CardMap: FC<EntryMap> = ({area, animation}) => {
  const refCard = useRef<HTMLDivElement>(null)
  useEntranceAnimation(refCard, animation)

  return (
    <div
      ref={refCard}
      className="w-full shrink-0 flex h-full contain-intrinsic card card-map overflow-hidden"
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
}
