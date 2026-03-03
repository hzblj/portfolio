'use client'

import gsap from 'gsap'
import Image from 'next/image'
import {FC, useEffect, useRef} from 'react'

import {Config} from '@/config'
import {EntryProfile} from '@/db'
import {useIntro} from '@/providers'

import {CardProfileControls} from './card-profile-controls'
import {LinkExternal} from './link-external'

export const CardProfile: FC<EntryProfile> = ({area}) => {
  const avatarRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const positionRef = useRef<HTMLDivElement>(null)
  const controlsRef = useRef<HTMLDivElement>(null)
  const {introComplete} = useIntro()

  useEffect(() => {
    gsap.set([avatarRef.current, controlsRef.current], {opacity: 0})
    gsap.set([nameRef.current, positionRef.current], {opacity: 0, y: 8})
  }, [])

  useEffect(() => {
    if (!introComplete) {
      return
    }

    if (!avatarRef.current || !nameRef.current || !positionRef.current || !controlsRef.current) {
      return
    }

    const tl = gsap.timeline()

    tl.to(avatarRef.current, {
      duration: 0.4,
      ease: 'power2.out',
      opacity: 1,
      scale: 1,
      startAt: {scale: 0.8},
    })

    tl.to(nameRef.current, {duration: 0.35, ease: 'power2.out', opacity: 1, y: 0}, '-=0.15')

    tl.to(positionRef.current, {duration: 0.35, ease: 'power2.out', opacity: 1, y: 0}, '-=0.2')

    gsap.set(controlsRef.current, {opacity: 1})

    const controlItems = controlsRef.current.querySelectorAll(':scope > div > div')

    gsap.set(controlItems, {opacity: 0, y: 6})

    tl.to(
      controlItems,
      {
        duration: 0.3,
        ease: 'power2.out',
        opacity: 1,
        stagger: 0.06,
        y: 0,
      },
      '-=0.15'
    )
  }, [introComplete])

  return (
    <div
      className="w-full shrink-0 flex h-full contain-intrinsic overflow-hidden card items-center justify-center"
      data-area="profile"
      style={{gridArea: area, transformStyle: 'preserve-3d'}}
    >
      <div className="flex flex-col w-full grow overflow-hidden h-full items-center">
        <div className="flex flex-row items-center gap-4 pt-[61px]">
          <div ref={avatarRef}>
            <div className="relative flex items-center justify-center rounded-[48px] overflow-hidden w-[64px] h-[64px] shadow-[inset_0_0_0_1px_#ffffff1a]">
              <Image
                preload
                src="/png/profile@3x.png"
                alt="profile-avatar"
                fill
                sizes="64px"
                style={{objectFit: 'cover'}}
              />
            </div>
          </div>
          <div>
            <div ref={nameRef}>
              <h1 className="text-[18px] font-medium leading-[24px] tracking-[0px] bg-[linear-gradient(180deg,#ffffff_0%,rgba(255,255,255,0.48)_100%)] bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]">
                {Config.fullName}
              </h1>
            </div>
            <div ref={positionRef} className="flex flex-row gap-[7px]">
              <h2 className="text-[18px] font-medium leading-[24px] tracking-[0px] text-white/50">
                {Config.company.position}
              </h2>
              <LinkExternal url={Config.company.url}>
                <h2 className="text-[18px] font-medium leading-[24px] tracking-[0px] bg-[linear-gradient(180deg,#ffffff_0%,rgba(255,255,255,0.48)_100%)] bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]">
                  {Config.company.name}
                </h2>
              </LinkExternal>
            </div>
          </div>
        </div>
        <div ref={controlsRef}>
          <CardProfileControls />
        </div>
      </div>
    </div>
  )
}
