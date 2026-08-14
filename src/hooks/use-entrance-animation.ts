import {gsap} from 'gsap'
import {type RefObject, useEffect, useLayoutEffect, useRef} from 'react'

import type {AnimationConfig} from '@/db/types'
import {useIntro} from '@/providers'

export const useEntranceAnimation = (ref: RefObject<HTMLDivElement | null>, animation?: AnimationConfig) => {
  const {introComplete} = useIntro()
  // The cards fly in behind the intro reveal. Coming back from a project page
  // the intro is already spent, so staging them offscreen only to fly them in
  // again would turn a return into a rebuild — leave them where they belong.
  const skipEntranceRef = useRef(introComplete)

  useLayoutEffect(() => {
    if (skipEntranceRef.current || !animation || !ref.current) {
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
    if (skipEntranceRef.current || !introComplete || !animation || !ref.current) {
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
