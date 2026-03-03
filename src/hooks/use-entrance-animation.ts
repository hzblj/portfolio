import {gsap} from 'gsap'
import {type RefObject, useLayoutEffect} from 'react'

import type {AnimationConfig} from '@/db/types'

export const useEntranceAnimation = (ref: RefObject<HTMLDivElement | null>, animation?: AnimationConfig) => {
  useLayoutEffect(() => {
    if (!animation || !ref.current) {
      return
    }

    const {origin, from, to} = animation

    gsap.set(ref.current, {
      opacity: from.opacity,
      scale: from.scale,
      transformOrigin: origin,
      x: from.x,
      y: from.y,
    })

    gsap.to(ref.current, {
      delay: to.delay,
      duration: to.duration,
      ease: to.ease,
      opacity: to.opacity,
      scale: to.scale,
      x: to.x,
      y: to.y,
    })
  }, [animation, ref])
}
