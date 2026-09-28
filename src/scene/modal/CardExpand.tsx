import type {FC} from 'react'

import type {OpenCard} from '../state'
import {ExpandLink} from './ExpandLink'

type CardExpandProps = {
  card: OpenCard
  onExpand: (href: string) => void
}

export const CardExpand: FC<CardExpandProps> = ({card, onExpand}) => {
  if (card.kind === 'shot') {
    return <ExpandLink href={`/${card.entry.slug}`} label={`${card.entry.title} case study`} onExpand={onExpand} />
  }

  return <ExpandLink href="/cv" label="the full CV" onExpand={onExpand} />
}
