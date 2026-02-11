'use client'

import {gsap} from 'gsap'
import Image from 'next/image'
import {FC, Fragment, PointerEvent, useCallback, useRef, useState} from 'react'

import {EntryShot} from '@/db'
import {useHasHover} from '@/hooks'
import {actionToggleModal, useCameraDispatch} from '@/providers'

import {CardShotHover} from './card-shot-hover'
import {CardShotModal} from './card-shot-modal'
import {CardShotVideo} from './card-shot-video'

export const CardShot: FC<EntryShot> = ({area, properties, title, description, image, videos, size}) => {
  const refTitle = useRef<HTMLDivElement>(null)
  const refVideoIcon = useRef<HTMLDivElement>(null)

  const hasHover = useHasHover()

  const dispatch = useCameraDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleEnter = useCallback((e: PointerEvent) => {
    if (e.pointerType !== 'mouse') {
      return
    }

    if (!refTitle.current) {
      return
    }

    gsap.killTweensOf(refTitle.current)

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

  const handleLeave = useCallback((e: PointerEvent) => {
    if (e.pointerType !== 'mouse') {
      return
    }

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

  const handleOnClose = useCallback(() => {
    setIsModalOpen(false)
    actionToggleModal(dispatch, false)
  }, [dispatch])

  const handleOnOpen = useCallback(() => {
    setIsModalOpen(true)
    actionToggleModal(dispatch, true)
  }, [dispatch])

  return (
    <Fragment>
      <div
        className="w-full shrink-0 flex h-full contain-intrinsic overflow-hidden bg-card-surface rounded-2xl border border-solid border-white/15 transform-3d bg-black"
        style={{gridArea: area}}
      >
        <div
          onClick={handleOnOpen}
          onPointerEnter={handleEnter}
          onPointerLeave={handleLeave}
          onPointerOver={handleEnter}
          role="button"
          className="flex flex-col w-full grow overflow-hidden relative items-center justify-center cursor-pointer"
        >
          <div className="w-full h-full flex justify-center items-center relative overflow-hidden">
            <Image
              priority
              src={image}
              alt={title}
              fill
              sizes={size === 'small' ? '289px' : '594px'}
              style={{objectFit: 'cover'}}
            />
            <CardShotVideo ref={refVideoIcon} videos={videos} image={image} hasHover={hasHover} />
          </div>
          {hasHover && <CardShotHover ref={refTitle} title={title} />}
        </div>
      </div>

      <CardShotModal
        isOpen={isModalOpen}
        onClose={handleOnClose}
        properties={properties}
        title={title}
        description={description}
        image={image}
        size={size}
        videos={videos}
      />
    </Fragment>
  )
}
