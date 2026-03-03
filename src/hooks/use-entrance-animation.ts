import {gsap} from 'gsap'
import {type RefObject, useEffect, useLayoutEffect} from 'react'

import type {AnimationConfig} from '@/db/types'
import {useIntro} from '@/providers'

export const useEntranceAnimation = (ref: RefObject<HTMLDivElement | null>, animation?: AnimationConfig) => {
  const {introComplete} = useIntro()

  useLayoutEffect(() => {
    if (!animation || !ref.current) {
      return
    }

    const {origin, from} = animation

    gsap.set(ref.current, {
      opacity: from.opacity,
      scale: from.scale,
      transformOrigin: origin,
      x: from.x,
      y: from.y,
    })
  }, [animation, ref])

  useEffect(() => {
    if (!introComplete || !animation || !ref.current) {
      return
    }

    const {to} = animation

    gsap.to(ref.current, {
      delay: to.delay,
      duration: to.duration,
      ease: to.ease,
      opacity: to.opacity,
      scale: to.scale,
      x: to.x,
      y: to.y,
    })
  }, [introComplete, animation, ref])
}
