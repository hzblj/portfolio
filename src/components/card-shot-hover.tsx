'use client'

import {forwardRef} from 'react'

import {EntryShot} from '@/db'

export type CardShotVideoProps = Pick<EntryShot, 'title'>

export const CardShotHover = forwardRef<HTMLDivElement, CardShotVideoProps>(({title}, ref) => (
  <div className="absolute right-0 bottom-[-1px] left-0 pointer-events-none">
    <div
      ref={ref}
      className="translate-y-[88px] opacity-0 w-full h-[87px] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.25)_20.37%,#000_100%)] flex items-end px-[16px] pb-[15px] will-change-[transform,opacity] transform-gpu"
    >
      <span className="block font-medium align-middle text-[13px] leading-[100%] tracking-[0px] text-white">
        {title}
      </span>
    </div>
  </div>
))
