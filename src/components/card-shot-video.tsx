'use client'

import Image from 'next/image'
import {Fragment, forwardRef} from 'react'

import {EntryShot} from '@/db'
import {HoverVideo} from './hover-video'

export type CardShotVideoProps = Pick<EntryShot, 'videos' | 'image'>

export const CardShotVideo = forwardRef<HTMLDivElement, CardShotVideoProps>(({videos, image}, ref) => {
  if (!videos) {
    return null
  }

  return (
    <Fragment>
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <HoverVideo srcMp4={videos.mp4} srcWebm={videos.webm} poster={image} muted loop preload="metadata" />
      </div>
      <div className="absolute right-[12px] top-[12.47px] rounded-2xl overflow-hidden">
        <div
          ref={ref}
          className="opacity-100 w-[22px] h-[22px] rounded-full flex items-center justify-center bg-white/15 will-change-[transform,opacity] transform-gpu"
        >
          <Image src="/svg/video.svg" alt="video-icon" width={12} height={12} />
        </div>
      </div>
    </Fragment>
  )
})
