'use client'

import {useEffect, useState} from 'react'

import {useIntro} from '@/providers'
import {cn} from '@/utils'

// Reveal the corner controls a beat after the intro hands off, so they arrive
// once the canvas cards have settled rather than competing with the entrance.
const REVEAL_DELAY_MS = 800

/**
 * Fixed anchor the corner controls (sound, zoom) portal into. Lives outside the
 * scaled canvas so it isn't affected by zoom, and stays hidden until the intro
 * animation completes.
 */
export const ControlsDock = () => {
  const {introComplete} = useIntro()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!introComplete) {
      return
    }

    const timeout = setTimeout(() => setVisible(true), REVEAL_DELAY_MS)

    return () => clearTimeout(timeout)
  }, [introComplete])

  return (
    <div
      className={cn(
        'fixed left-6 top-6 z-50 flex items-center gap-2 transition-[opacity,transform] duration-500 ease-out',
        visible ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
      )}
      id="controls-dock"
    />
  )
}
