'use client'

import {gsap} from 'gsap'
import Image from 'next/image'
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

const LocationDot = () => (
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

export const CardMapLocation = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current

    const ctx = gsap.context(() => {
      el.addEventListener('mouseenter', () => {
        gsap.killTweensOf(el)

        gsap.to(el, {
          duration: 0.6,
          ease: 'power3.out',
          scale: 1.1,
          transformOrigin: 'center center',
        })
      })

      el.addEventListener('mouseleave', () => {
        gsap.killTweensOf(el)

        gsap.to(el, {
          duration: 0.6,
          ease: 'power3.inOut',
          scale: 1,
        })
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-grow overflow-hidden relative rounded-2xl z-10">
      <div className="flex flex-1 m-[1px] rounded-2xl">
        <div
          ref={ref}
          className="absolute left-[1px] right-[1px] top-[1px] bottom-[1px] overflow-hidden z-10 [transform-style:preserve-3d] will-change-transform cursor-pointer"
        >
          <div className="w-full h-full">
            <Image
              priority
              src="/svg/map.svg"
              alt="alt"
              fill
              sizes="786px"
              className="rounded-2xl"
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
          <LocationDot />
        </div>
      </div>
    </div>
  )
}
