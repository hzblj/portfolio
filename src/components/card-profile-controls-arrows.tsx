'use client'

import gsap from 'gsap'
import Image from 'next/image'
import {useEffect, useRef} from 'react'

export const CardProfileControlsArrows = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current

    if (!el) {
      return
    }

    const STEP = 0.6
    const GAP = 0.25
    const LOOP_GAP = 0.8

    const tl = gsap.timeline({
      defaults: {ease: 'power2.out'},
      repeat: -1,
      repeatDelay: LOOP_GAP,
    })

    tl.to(el, {duration: STEP, y: -4})
      .to(el, {duration: STEP, x: -4, y: 0}, `+=${GAP}`)
      .to(el, {duration: STEP + 0.2, ease: 'power2.inOut', x: 0, y: 0}, `+=${GAP}`)

    return () => {
      tl.kill()
    }
  }, [])
  return (
    <div className="w-4 h-4 relative">
      <div className="absolute left-[-4px] top-[-2px] right-0 bottom-0">
        <div
          ref={ref}
          className="w-[24px] h-[24px] flex items-center justify-center will-change-transform [transform:translateZ(0)]"
        >
          <Image priority src="/svg/arrows.svg" alt="arrows" width={24} height={24} style={{objectFit: 'cover'}} />
        </div>
      </div>
    </div>
  )
}
