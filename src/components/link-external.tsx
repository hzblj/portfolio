'use client'

import gsap from 'gsap'
import {type FC, type ReactNode, useCallback, useRef} from 'react'

export type LinkExternalProps = {
  url: string
  children: ReactNode
}

export const LinkExternal: FC<LinkExternalProps> = ({url, children}) => {
  const lineRef = useRef<HTMLDivElement>(null)

  const handleEnter = useCallback(() => {
    gsap.killTweensOf(lineRef.current)
    gsap.to(lineRef.current, {
      delay: 0.15,
      duration: 0.4,
      ease: 'power3.out',
      width: '100%',
    })
  }, [])

  const handleLeave = useCallback(() => {
    gsap.killTweensOf(lineRef.current)
    gsap.to(lineRef.current, {
      duration: 0.2,
      ease: 'power3.in',
      width: 0,
    })
  }, [])

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="inline-block relative"
    >
      {children}
      <div className="absolute w-full bottom-[-1.5px]">
        <div
          ref={lineRef}
          className="h-[1.5px] w-0 will-change-[width,height] bg-[linear-gradient(to_right,#ffffff_0%,rgba(255,255,255,0.48)_100%)]"
        />
      </div>
    </a>
  )
}
