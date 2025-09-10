'use client'

import {gsap} from 'gsap'
import Image from 'next/image'
import {FC, useCallback, useRef} from 'react'

import {cn} from '@/utils/cn'

export type TechnologyVariant = 'white' | 'blue'

export type TechnologyProps = {
  title: string
  image: string
  url: string
  variant: TechnologyVariant
}

const variantClasses: Record<TechnologyVariant, string> = {
  blue: `
    bg-[linear-gradient(180deg,#1CEDFC_0%,rgba(28,237,252,0.72)_100%)]
    drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]
  `,
  white: `
    bg-[linear-gradient(180deg,#FFFFFF_0%,rgba(255,255,255,0.72)_100%)]
    drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]
  `,
}

export const CardTechnologiesTechnology: FC<TechnologyProps> = ({title, image, variant, url}) => {
  const ref = useRef<HTMLImageElement>(null)

  const handleEnter = useCallback(() => {
    gsap.to(ref.current, {
      duration: 0.5,
      ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
      y: -12,
    })
  }, [])

  const handleLeave = useCallback(() => {
    gsap.to(ref.current, {
      duration: 0.5,
      ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
      y: 0,
    })
  }, [])

  return (
    <a href={url} target="_blank">
      <div className="flex flex-col items-center" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        <div className="w-[96px] h-[84px] relative mb-3">
          <Image
            ref={ref}
            src={image}
            priority
            alt={title}
            fill
            sizes="84px"
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
        <h3
          className={cn(
            'text-[14px] font-normal leading-[100%] tracking-[0px] bg-clip-text text-transparent',
            variantClasses[variant]
          )}
        >
          {title}
        </h3>
      </div>
    </a>
  )
}
