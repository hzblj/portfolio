import gsap from 'gsap'
import {useCallback} from 'react'

import type {EntryShot} from '@/db'
import {trackProjectView} from '@/lib/analytics'

import {useEntity, useMotion} from '../../entity'
import {setCursor} from '../../interaction'
import {openCard} from '../../state'
import {useHoverVideo} from './useHoverVideo'

const HOVER_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

type PointerLike = {pointerType: string}

export const useShotInteraction = (entry: EntryShot) => {
  const {slot, worldRect} = useEntity()
  const title = useMotion({opacity: 0, y: 88})
  const badge = useMotion({opacity: 1, scale: 1})
  const video = useHoverVideo(entry.videos)

  const onPointerEnter = useCallback(
    (_: unknown, event: PointerLike) => {
      if (event.pointerType !== 'mouse') {
        return
      }

      setCursor(true)
      gsap.killTweensOf(title)
      gsap.to(title, {duration: 0.5, ease: HOVER_EASE, opacity: 1, y: 0})
      gsap.to(badge, {duration: 0.35, ease: 'power2.out', opacity: 0, scale: 0.9})
      video.play()
    },
    [badge, title, video]
  )

  const onPointerLeave = useCallback(
    (_: unknown, event: PointerLike) => {
      if (event.pointerType !== 'mouse') {
        return
      }

      setCursor(false)
      gsap.to(title, {duration: 0.5, ease: HOVER_EASE, opacity: 0, y: 88})
      gsap.to(badge, {delay: 0.05, duration: 0.35, ease: 'power2.out', opacity: 1, scale: 1})
      video.stop()
    },
    [badge, title, video]
  )

  const onClick = useCallback(() => {
    trackProjectView(entry.title)
    openCard(
      {entry, kind: 'shot'},
      {media: video.source.texture ?? undefined, rect: worldRect(), slot, slug: entry.slug}
    )
  }, [entry, slot, video, worldRect])

  return {badge, handlers: {onClick, onPointerEnter, onPointerLeave}, title, video: video.source}
}
