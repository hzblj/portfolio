import type {FC} from 'react'

import {cn} from '@/utils'

export const WORD_SELECTOR = '[data-word]'

export type SplitWordsProps = {
  children: string
  className?: string
}

/**
 * Text split into words that can move on their own — the DOM side of the split
 * reveal the profile card plays on the canvas.
 *
 * Each word is an inline block, because a transform needs one, but the spaces
 * between them stay ordinary text: the line breaks where it always did and a
 * word is exactly as wide as before. Anything painted *through* the text — a
 * gradient clipped to it — goes on the words via `className`, since a word that
 * moves becomes its own layer and no longer shows its parent's background.
 */
export const SplitWords: FC<SplitWordsProps> = ({children, className}) => {
  const parts = children.split(/(\s+)/)

  return (
    <>
      {parts.map((part, index) =>
        part.trim() === '' ? (
          part
        ) : (
          <span key={index.toString()} data-word="true" className={cn('inline-block', className)}>
            {part}
          </span>
        )
      )}
    </>
  )
}
