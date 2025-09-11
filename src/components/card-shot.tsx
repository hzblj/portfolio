'use client'

import {gsap} from 'gsap'
import Image from 'next/image'
import {FC, Fragment, useCallback, useRef, useState} from 'react'

import {EntryShot} from '@/db'

import {CardShotModal} from './card-shot-modal'
import {HoverVideo} from './hover-video'

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
        className="w-full shrink-0 flex h-full contain-intrinsic overflow-hidden bg-card-surface rounded-2xl border border-solid border-white/15"
        style={{gridArea: area, transformStyle: 'preserve-3d'}}
      >
        <div
          onClick={onOpen}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
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
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <HoverVideo srcMp4={videos.mp4} srcWebm={videos.webm} poster={image} muted loop preload="auto" />
              </div>
            )}

            {videos && (
              <div className="absolute right-[12px] top-[12.47px] rounded-2xl overflow-hidden">
                <div
                  ref={refVideoIcon}
                  className="opacity-100 w-[22px] h-[22px] rounded-full flex items-center justify-center bg-white/15"
                >
                  <Image src="/svg/video.svg" alt="video-icon" width={12} height={12} />
                </div>
              </div>
            )}
          </div>

          <div className="absolute right-0 bottom-0 left-0 pointer-events-none">
            <div
              ref={refTitle}
              className="translate-y-[88px] opacity-0 w-full h-[87px] rounded-bl-2xl rounded-br-2xl bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.25)_20.37%,#000_100%)] flex items-end px-[16px] pb-[15px]"
            >
              <span className="block font-medium align-middle text-[13px] leading-[100%] tracking-[0px] text-white">
                {title}
              </span>
            </div>
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
