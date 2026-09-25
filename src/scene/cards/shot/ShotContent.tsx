'use client'

import {type FC, useMemo} from 'react'

import type {EntryShot} from '@/db'
import {useHasHover} from '@/hooks/use-has-hover'

import {SafeSuspense} from '../../boundary'
import {FocusRing, PaperLayer, Surface, useEntity} from '../../entity'
import {BLACK, HAIRLINE} from '../../graphics'
import {insetRect} from '../../grid'
import {focusIds} from '../../state'
import {ShotArtwork} from './ShotArtwork'
import {ShotTitle} from './ShotTitle'
import {useShotInteraction} from './useShotInteraction'
import {VideoBadge} from './VideoBadge'

type ShotContentProps = {
  entry: EntryShot
}

export const ShotContent: FC<ShotContentProps> = ({entry}) => {
  const {size} = useEntity()
  const hasHover = useHasHover()
  const card = useMemo(() => ({x: 0, y: 0, ...size}), [size])
  const artwork = useMemo(() => insetRect(card, 1), [card])
  const {badge, handlers, title, video} = useShotInteraction(entry)

  return (
    <>
      <Surface fill={BLACK} border={HAIRLINE} {...handlers} />
      <FocusRing id={focusIds.shot(entry.slug)} rect={card} radius={16} />
      <SafeSuspense fallback={null}>
        <ShotArtwork entry={entry} rect={artwork} video={video} />
        {entry.videos && <VideoBadge motion={badge} />}
        <PaperLayer rect={artwork} radius={15} order={4} />
        {hasHover && <ShotTitle title={entry.title} clip={artwork} motion={title} />}
      </SafeSuspense>
    </>
  )
}
