'use client'

import Link from 'next/link'
import {type FC, type MouseEvent, useCallback} from 'react'

import {Config} from '@/config'
import {useAdaptiveGlass} from '@/hooks'
import {useViewTransitionNavigate} from '@/providers'
import {cn} from '@/utils'

import {iconButtonClassName, iconButtonGlyphClassName, modalControlClassName} from './icon-button'

export type CardExpandLinkProps = {
  /** The page this card expands into. */
  href: string
  /** What it expands into, for screen readers: "Open <label>". */
  label: string
  className?: string
}

/**
 * Expands a modal into its own page. A real anchor, so the route stays
 * crawlable and middle-clickable; the click handler only takes over to wrap the
 * push in a view transition.
 */
export const CardExpandLink: FC<CardExpandLinkProps> = ({href, label, className}) => {
  const navigate = useViewTransitionNavigate()
  const glass = useAdaptiveGlass<HTMLAnchorElement>()

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      // New tab, new window, download — leave those to the browser.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
        return
      }

      event.preventDefault()
      navigate({direction: 'forward', to: href})
    },
    [href, navigate]
  )

  return (
    <Link
      ref={glass}
      href={href}
      onClick={handleClick}
      aria-label={`Open ${label}`}
      title="Open full page"
      className={cn(iconButtonClassName, modalControlClassName, className)}
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
          d="M14 4h6v6M20 4l-7.25 7.25"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 20H4v-6M4 20l7.25-7.25"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  )
}
