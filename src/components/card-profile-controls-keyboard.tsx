'use client'

import gsap from 'gsap'
import Image from 'next/image'
import {useEffect, useRef} from 'react'

export const CardProfileControlsKeyboard = () => {
  const refW = useRef<HTMLDivElement>(null)
  const refS = useRef<HTMLDivElement>(null)
  const refA = useRef<HTMLDivElement>(null)
  const refD = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const els = [refW.current, refD.current, refA.current, refS.current].filter(Boolean) as HTMLDivElement[]

    if (els.length !== 4) {
      return
    }

    gsap.set(els, {
      opacity: 0.2,
      scale: 1,
      transformOrigin: '50% 50%',
    })

    const STEP = 0.8
    const GAP = 0.4
    const RESET = 0.3
    const LOOP_GAP = 0.4

    const tl = gsap.timeline({repeat: -1})

    els.forEach(el => {
      tl.to(el, {duration: STEP, ease: 'power2.out', opacity: 0.8, scale: 0.8})
        .to(el, {duration: GAP})
        .to(el, {duration: RESET, ease: 'power2.inOut', opacity: 0.2, scale: 1})
    })

    tl.to({}, {duration: LOOP_GAP})

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div className="h-4 w-[25px] relative">
      <div className="absolute left-0 top-[4px] right-0 bottom-0">
        <div className="flex flex-col items-center gap-[0.5px]">
          <div ref={refW} className="w-[6px] h-[6px] flex items-center justify-center opacity-20 will-change-transform">
            <Image priority src="/svg/key-cap.svg" alt="alt" width={6} height={6} className="object-cover" />
          </div>
          <div className="flex flex-row gap-[0.5px]">
            <div
              ref={refA}
              className="w-[6px] h-[6px] flex items-center justify-center opacity-20 will-change-transform"
            >
              <Image priority src="/svg/key-cap.svg" alt="alt" width={6} height={6} className="object-cover" />
            </div>
            <div
              ref={refS}
              className="w-[6px] h-[6px] flex items-center justify-center opacity-20 will-change-transform"
            >
              <Image priority src="/svg/key-cap.svg" alt="alt" width={6} height={6} className="object-cover" />
            </div>
            <div
              ref={refD}
              className="w-[6px] h-[6px] flex items-center justify-center opacity-20 will-change-transform"
            >
              <Image priority src="/svg/key-cap.svg" alt="alt" width={6} height={6} className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
