'use client'

import {FC, useCallback, useRef} from 'react'

export type HoverVideoProps = {
  srcMp4: string
  srcWebm: string
  poster?: string
  loop?: boolean
  muted?: boolean
  preload?: 'none' | 'metadata' | 'auto'
}

export const HoverVideo: FC<HoverVideoProps> = ({
  srcMp4,
  srcWebm,
  poster,
  loop = true,
  muted = true,
  preload = 'none',
}) => {
  const ref = useRef<HTMLVideoElement | null>(null)

  const play = useCallback(async () => {
    const el = ref.current

    if (!el) {
      return
    }

    if (el.preload === 'none') {
      el.preload = 'auto'
    }

    try {
      await el.play()
    } catch (err) {
      console.error(err)
    }
  }, [])

  const pause = useCallback(() => {
    const el = ref.current

    if (!el) {
      return
    }

    el.pause()
    el.currentTime = 0
  }, [])

  const toggle = useCallback(() => {
    const el = ref.current

    if (!el) {
      return
    }

    if (el.paused) {
      void play()
    } else {
      pause()
    }
  }, [play, pause])

  return (
    <div
      className="relative overflow-hidden rounded-2xl w-full h-full"
      onMouseEnter={play}
      onMouseLeave={pause}
      onFocus={play}
      onBlur={pause}
      onTouchStart={toggle}
      role="button"
    >
      <video
        ref={ref}
        className="block w-full h-full object-cover rounded-2xl"
        playsInline
        loop={loop}
        muted={muted}
        controls={false}
        preload={preload}
        poster={poster}
      >
        <source src={srcWebm} type="video/webm" />
        <source src={srcMp4} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
