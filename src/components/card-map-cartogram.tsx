'use client'

import {gsap} from 'gsap'
import Image from 'next/image'
import {FC, ReactNode, useEffect, useRef} from 'react'

import {Config} from '@/config'

type CardMapCartogramProps = {
  children?: ReactNode
}

export const CardMapCartogram: FC<CardMapCartogramProps> = ({children}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }

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
      <div className="absolute inset-[1px] overflow-hidden rounded-2xl">
        <div
          ref={ref}
          className="absolute inset-[1px] will-change-transform [transform-style:preserve-3d] cursor-pointer transform-gpu"
        >
          <a href={Config.location.mapUrl} target="_blank" className="rounded-2xl">
            <Image
              priority
              src="/svg/map.svg"
              alt="map"
              fill
              sizes="786px"
              className="rounded-2xl"
              style={{objectFit: 'cover'}}
            />
            {children}
          </a>
        </div>
      </div>
    </div>
  )
}
