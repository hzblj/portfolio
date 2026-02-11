'use client'

import {FC, PointerEvent, useCallback, useRef} from 'react'

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

  const play = useCallback(async (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') {
      return
    }

    const el = ref.current

    if (!el) {
      return
    }

    if (el.preload === 'none') {
      el.preload = 'auto'
    }

    try {
      if (!el.paused) {
        return
      }
      await el.play()
    } catch (err) {
      // biome-ignore lint/suspicious/noConsole: Log video warning
      console.warn(err)
    }
  }, [])

  const pause = useCallback((e: PointerEvent) => {
    if (e.pointerType !== 'mouse') {
      return
    }

    const el = ref.current

    if (!el) {
      return
    }

    try {
      if (!el.paused && !el.ended) {
        el.pause()
      }

      el.currentTime = 0
    } catch (e) {
      // biome-ignore lint/suspicious/noConsole: Log video warning
      console.warn(e)
    }
  }, [])

  return (
    <div
      className="relative overflow-hidden rounded-2xl w-full h-full"
      onPointerEnter={play}
      onPointerOver={play}
      onPointerLeave={pause}
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
