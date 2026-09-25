'use client'

import {type FC, useLayoutEffect, useRef} from 'react'

import {handBackToModal, pageArrival, settlePageArrival} from '@/lib/page-handoff'
import {findScroller} from '@/utils'

const readScroll = (scroller: HTMLElement | undefined) => scroller?.scrollTop ?? window.scrollY

/**
 * The page's end of the hand-over with an open card. Opens the page scrolled to
 * wherever the modal was, and leaves the page's scroll behind for the modal on
 * the way out.
 *
 * Render it ahead of anything that measures the page on mount — layout effects
 * run in document order, and the scroll has to be in place before they read it.
 */
export const PageArrival: FC = () => {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const scroller = findScroller(ref.current)
    const target = scroller ?? window
    const arrival = pageArrival()
    settlePageArrival()

    if (arrival) {
      target.scrollTo({top: arrival.scroll})
    }

    let last = readScroll(scroller)
    const onScroll = () => {
      last = readScroll(scroller)
    }

    target.addEventListener('scroll', onScroll, {passive: true})

    return () => {
      target.removeEventListener('scroll', onScroll)
      handBackToModal(last)
    }
  }, [])

  return <div ref={ref} hidden />
}
