'use client'

import {gsap} from 'gsap'
import Image from 'next/image'
import {FC, Fragment, PointerEvent, useCallback, useLayoutEffect, useRef, useState} from 'react'

import {EntryShot} from '@/db'
import {useEntranceAnimation, useHasHover, useSound} from '@/hooks'
import {trackProjectView} from '@/lib'
import {actionToggleModal, useCameraDispatch} from '@/providers'
import {claimOpenCard, releaseOpenCard, setOpenCard} from './card-session'
import {CardShotHover} from './card-shot-hover'
import {CardShotModal} from './card-shot-modal'
import {CardShotVideo} from './card-shot-video'

export const CardShot: FC<EntryShot> = ({
  area,
  properties,
  title,
  description,
  image,
  videos,
  size,
  slug,
  animation,
}) => {
  const refCard = useRef<HTMLDivElement>(null)
  const refTitle = useRef<HTMLDivElement>(null)
  const refVideoIcon = useRef<HTMLDivElement>(null)

  const hasHover = useHasHover()
  useEntranceAnimation(refCard, animation)

  const dispatch = useCameraDispatch()
  const sound = useSound('modal')
  const [isModalOpen, setIsModalOpen] = useState(false)
  // Set only when the modal comes back from the session rather than from a
  // click: a return is not an opening, so it should not replay the flourish.
  const [isRestored, setIsRestored] = useState(false)

  // Client-only and before paint, so the card is simply already open on arrival
  // — the modal is portalled into `#main`, which does not exist on the server.
  useLayoutEffect(() => {
    if (!claimOpenCard(slug)) {
      return
    }

    setIsModalOpen(true)
    setIsRestored(true)
    actionToggleModal(dispatch, true)

    return () => releaseOpenCard(slug)
  }, [dispatch, slug])

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
    setIsRestored(false)
    actionToggleModal(dispatch, false)
    setOpenCard(null)
  }, [dispatch])

  const handleOnOpen = useCallback(() => {
    sound.open()
    setIsModalOpen(true)
    setIsRestored(false)
    actionToggleModal(dispatch, true)
    setOpenCard(slug)
    trackProjectView(title)
  }, [dispatch, slug, sound, title])

  return (
    <Fragment>
      <div
        ref={refCard}
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
          <div className="w-full h-full flex justify-center items-center relative overflow-hidden isolate">
            <Image
              src={image}
              alt={title}
              fill
              loading="eager"
              fetchPriority="high"
              sizes={size === 'small' ? '289px' : '594px'}
              style={{objectFit: 'cover'}}
            />
            <CardShotVideo ref={refVideoIcon} videos={videos} image={image} hasHover={hasHover} />
            {/* Last, so the hover video keeps the grain too. `isolate` above
                keeps the blend inside the artwork. */}
            <div className="absolute inset-0 texture-paper texture-paper-dark" />
          </div>
          {hasHover && <CardShotHover ref={refTitle} title={title} />}
        </div>
      </div>

      <CardShotModal
        isOpen={isModalOpen}
        instant={isRestored}
        onClose={handleOnClose}
        properties={properties}
        title={title}
        description={description}
        image={image}
        size={size}
        slug={slug}
        videos={videos}
      />
    </Fragment>
  )
}
