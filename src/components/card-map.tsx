import {FC} from 'react'

import {EntryMap} from '@/db'

import {CardMapLocation} from './card-map-location'

const CityBadge = () => (
  <div className="absolute left-[16px] bottom-[16px] z-20">
    <div className="px-3 py-1.5 rounded-[8px] shadow-[inset_0_0_0_1px_#FFFFFF29] backdrop-blur-[4px] bg-[#FFFFFF17]">
      <span className="text-[14px] font-medium leading-[24px] tracking-[0px]">Prague, Czechia</span>
    </div>
  </div>
)

export const CardMap: FC<EntryMap> = ({area}) => (
  <div
    className="w-full shrink-0 flex h-full contain-intrinsic card-map-border-gradient overflow-hidden"
    style={{gridArea: area, transformStyle: 'preserve-3d'}}
  >
    <div className="flex flex-col w-full grow overflow-hidden h-full relative rounded-2xl">
      <CardMapLocation />
      <CityBadge />
    </div>
  </div>
)
