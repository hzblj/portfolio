'use client'

import {gsap} from 'gsap'
import {useEffect, useRef} from 'react'

const LocationDotPulse = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    gsap.to(ref.current, {
      keyframes: [
        {duration: 0.8, ease: 'power2.out', scale: 1.2}, // Up
        {duration: 1.2, ease: 'power2.inOut', scale: 0.9}, // Down
      ],
      repeat: -1,
      transformOrigin: 'center',
    })
  }, [])

  return (
    <div
      ref={ref}
      className="w-[44px] h-[44px] rounded-full bg-[#1B88FF66] [transform-style:preserve-3d] [will-change:transform]"
    >
      <div />
    </div>
  )
}

export const CardMapLocation = () => (
  <div className="absolute top-auto right-[150px] bottom-[100px] left-auto z-20">
    <div className="relative w-[44px] h-[44px] flex items-center justify-center">
      <div className="flex items-center justify-center w-[28px] h-[28px] bg-white rounded-2xl z-40">
        <div className="w-[18px] h-[18px] bg-[#1B88FF] rounded-2xl" />
      </div>
      <div className="absolute left-0 right-0 bottom-0 top-0 z-10">
        <LocationDotPulse />
      </div>
    </div>
  </div>
)
