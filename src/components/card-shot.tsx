'use client'

import Image from 'next/image'
import {FC, Fragment, useCallback, useState} from 'react'

import {EntryShot} from '@/db'

import {CardShotModal} from './card-shot-modal'
import {HoverVideo} from './hover-video'

export const CardShot: FC<EntryShot> = ({area, properties, title, description, image, videos}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onOpen = useCallback(() => setIsModalOpen(true), [])
  const onClose = useCallback(() => setIsModalOpen(false), [])

  return (
    <Fragment>
      <div
        className="w-full shrink-0 flex h-full contain-intrinsic overflow-hidden bg-card-surface rounded-2xl border border-solid border-white/15"
        style={{gridArea: area, transformStyle: 'preserve-3d'}}
      >
        <div
          onClick={onOpen}
          className="flex flex-col w-full grow overflow-hidden relative items-center justify-center rounded-2xl cursor-pointer"
        >
          <div className="w-full h-full flex justify-center items-center relative overflow-hidden">
            <Image
              priority
              src={image}
              alt="alt"
              fill
              sizes="288px"
              style={{
                objectFit: 'cover',
              }}
            />
            {videos && (
              <div className="absolute inset-0 bg-green-800 rounded-2xl overflow-hidden">
                <HoverVideo srcMp4={videos.mp4} srcWebm={videos.webm} poster={image} muted loop preload="auto" />
              </div>
            )}
          </div>
        </div>
      </div>
      <CardShotModal
        isModalOpen={isModalOpen}
        onClose={onClose}
        properties={properties}
        title={title}
        description={description}
        image={image}
      />
    </Fragment>
  )
}
