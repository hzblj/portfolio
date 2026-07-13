'use client'

import {useEffect, useState} from 'react'
import {createPortal} from 'react-dom'

import {useSoundContext} from '@/providers'

const IconSound = () => (
  <svg
    aria-hidden="true"
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path d="M11 5 6 9H2v6h4l5 4V5z" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
)

const IconMuted = () => (
  <svg
    aria-hidden="true"
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path d="M11 5 6 9H2v6h4l5 4V5z" />
    <line x1="23" x2="17" y1="9" y2="15" />
    <line x1="17" x2="23" y1="9" y2="15" />
  </svg>
)

export const SoundControls = () => {
  const {isMuted, toggleMuted} = useSoundContext()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const dock = document.getElementById('controls-dock') ?? document.body

  return createPortal(
    <div
      className="order-1 flex select-none items-center rounded-full border border-white/15 bg-white/10 p-1 text-white backdrop-blur-xl"
      onPointerDown={e => e.stopPropagation()}
      onWheel={e => e.stopPropagation()}
    >
      <button
        aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
        aria-pressed={isMuted}
        className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/15"
        onClick={toggleMuted}
        type="button"
      >
        {isMuted ? <IconMuted /> : <IconSound />}
      </button>
    </div>,
    dock
  )
}
