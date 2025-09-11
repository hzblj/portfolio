'use client'

import {gsap} from 'gsap'
import Image from 'next/image'
import {FC, Fragment, useCallback, useRef, useState} from 'react'

import {EntryShot} from '@/db'

import {CardShotHover} from './card-shot-hover'
import {CardShotModal} from './card-shot-modal'
import {CardShotVideo} from './card-shot-video'

export const CardShot: FC<EntryShot> = ({area, properties, title, description, image, videos}) => {
  const refTitle = useRef<HTMLDivElement>(null)
  const refVideoIcon = useRef<HTMLDivElement>(null)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const onOpen = useCallback(() => setIsModalOpen(true), [])
  const onClose = useCallback(() => setIsModalOpen(false), [])

  const handleEnter = useCallback(() => {
    if (!refTitle.current) {
      return
    }

    gsap.to(refTitle.current, {
      duration: 0.5,
      ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
      opacity: 1,
      y: 0,
    })

    if (refVideoIcon.current) {
      gsap.to(refVideoIcon.current, {
        autoAlpha: 0,
        duration: 0.35,
        ease: 'power2.out',
        scale: 0.9,
      })
    }
  }, [])

  const handleLeave = useCallback(() => {
    if (!refTitle.current) {
      return
    }

    gsap.to(refTitle.current, {
      duration: 0.5,
      ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
      opacity: 0,
      y: 88,
    })

    if (refVideoIcon.current) {
      gsap.to(refVideoIcon.current, {
        autoAlpha: 1,
        delay: 0.05,
        duration: 0.35,
        ease: 'power2.out',
        scale: 1,
      })
    }
  }, [])

  return (
    <Fragment>
      <div
        className="w-full shrink-0 flex h-full contain-intrinsic overflow-hidden bg-card-surface rounded-2xl border border-solid border-white/15 transform-3d"
        style={{gridArea: area}}
      >
        <div
          onClick={onOpen}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          className="flex flex-col w-full grow overflow-hidden relative items-center justify-center cursor-pointer"
        >
          <div className="w-full h-full flex justify-center items-center relative overflow-hidden">
            <Image priority src={image} alt={title} fill sizes="288px" style={{objectFit: 'cover'}} />
            <CardShotVideo ref={refVideoIcon} videos={videos} image={image} />
          </div>
          <CardShotHover ref={refTitle} title={title} />
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
