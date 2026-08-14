'use client'

import Link from 'next/link'
import {type FC, type MouseEvent, useCallback} from 'react'

import {Config} from '@/config'
import {useAdaptiveGlass} from '@/hooks'
import {useCanGoBack, useViewTransitionNavigate} from '@/providers'
import {cn} from '@/utils'

import {iconButtonClassName, iconButtonGlyphClassName, pageControlClassName} from './icon-button'

export type CardCollapseLinkProps = {
  className?: string
}

/**
 * The counterpart to [CardExpandLink]: same pill, same corner, arrows turned
 * inwards. Sitting where the expand control sat makes the morph read as one
 * control flipping rather than two buttons swapping places.
 *
 * Goes back through history when there is somewhere to go back to, so returning
 * lands on the grid exactly as it was left — panned, zoomed and past its intro —
 * instead of pushing a fresh `/` that mounts the whole camera again. Keeps the
 * `/` href for cold landings, crawlers and middle-clicks.
 */
export const CardCollapseLink: FC<CardCollapseLinkProps> = ({className}) => {
  const navigate = useViewTransitionNavigate()
  const canGoBack = useCanGoBack()
  const glass = useAdaptiveGlass<HTMLAnchorElement>()

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      // New tab, new window, download — leave those to the browser.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
        return
      }

      event.preventDefault()

      // A cold landing has nothing to go back to, but it is still the same
      // gesture — collapsing out of the page — so it reads the same way.
      navigate(canGoBack() ? {direction: 'back'} : {direction: 'back', to: '/'})
    },
    [canGoBack, navigate]
  )

  return (
    <Link
      ref={glass}
      href="/"
      onClick={handleClick}
      aria-label="Back to the portfolio"
      title="Back to the portfolio"
      className={cn(iconButtonClassName, pageControlClassName, className)}
      style={{viewTransitionName: Config.viewTransition.toggle}}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={iconButtonGlyphClassName}
        style={{viewTransitionName: Config.viewTransition.toggleIcon}}
      >
        <path
          d="M20 10h-6V4M20 4l-6 6"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 14h6v6M4 20l6-6"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  )
}
