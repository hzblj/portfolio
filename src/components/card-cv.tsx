'use client'

import {gsap} from 'gsap'
import {FC, useCallback, useRef} from 'react'

import {CV} from '@/components'
import {EntryCV} from '@/db'

export const CardCV: FC<EntryCV> = ({area}) => {
  const ref = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null)

  const handleEnter = useCallback(() => {
    if (!ref.current) {
      return
    }

    tlRef.current?.kill()
    const tl = gsap.timeline()

    tl.to(ref.current, {
      duration: 0.8,
      ease: 'power3.out',
      y: -80,
    }).to(ref.current, {
      duration: 0.6,
      ease: 'power2.inOut',
      y: 0,
    })

    tlRef.current = tl
  }, [])

  const handleLeave = useCallback(() => {
    if (!ref.current) {
      return
    }

    tlRef.current?.kill()
    gsap.killTweensOf(ref)

    tlRef.current = gsap.to(ref.current, {
      duration: 0.5,
      ease: 'power3.inOut',
      y: 0,
    })
  }, [])

  return (
    <div
      className="w-full shrink-0 flex h-full contain-intrinsic overflow-hidden card card-cv"
      style={{gridArea: area, transformStyle: 'preserve-3d'}}
    >
      <div
        className="flex flex-col w-full grow overflow-hidden h-full relative cursor-pointer"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <div
          className="absolute inset-[1px] overflow-hidden h-[681px] w-full pointer-events-none"
          style={{clipPath: 'inset(2px round 16px)'}}
        >
          <div ref={ref} className="w-[700px] h-[2000px] scale-[0.576923] origin-top-left pt-[64px] pl-[50px]">
            <CV />
          </div>
        </div>
        <div
          className="absolute bottom-[1px] overflow-hidden flex justify-end items-end rounded-2xl h-full w-full pointer-events-none"
          style={{clipPath: 'inset(1px round 16px)'}}
        >
          <div className="h-[146px] w-full rounded-br-2xl rounded-bl-2xl bg-gradient-to-b from-black/0 to-black to-[72.83%] flex items-end justify-center">
            <span className="text-[14px] opacity-70 font-normal tracking-[0px] bg-[linear-gradient(180deg,#ffffff_0%,rgba(255,255,255,0.72)_100%)] bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(0,0,0,0.25)] pb-[32px]">
              CV
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
