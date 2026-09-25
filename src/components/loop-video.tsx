'use client'

import {FC, useEffect, useLayoutEffect, useRef, useState} from 'react'

import {borrowVideo, hasLentVideo} from '@/lib/lent-video'

export type LoopVideoProps = {
  srcMp4: string
  srcWebm: string
  poster?: string
  muted?: boolean
  autoPlay?: boolean
}

type BorrowedVideoProps = {
  src: string
}

// The card's own element keeps playing in here, styled like the one below.
const BorrowedVideo: FC<BorrowedVideoProps> = ({src}) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const holder = ref.current

    if (!holder) {
      return
    }

    return borrowVideo(src, holder) ?? undefined
  }, [src])

  return (
    <div
      ref={ref}
      className="h-full w-full [&>video]:block [&>video]:h-full [&>video]:w-full [&>video]:rounded-[20px] [&>video]:object-cover"
    />
  )
}

const OwnVideo: FC<LoopVideoProps> = ({srcMp4, srcWebm, poster, muted = true, autoPlay = true}) => {
  const ref = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const el = ref.current

    if (!el || !autoPlay) {
      return
    }

    const playVideo = async () => {
      try {
        await el.play()
      } catch (err) {
        // biome-ignore lint/suspicious/noConsole: Log video warning
        console.warn('Autoplay failed', err)
      }
    }

    playVideo()
  }, [autoPlay])

  return (
    <video
      ref={ref}
      className="block w-full h-full object-cover rounded-[20px]"
      playsInline
      loop
      muted={muted}
      autoPlay={autoPlay}
      controls={false}
      preload="auto"
      poster={poster}
    >
      <source src={srcWebm} type="video/webm" />
      <source src={srcMp4} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

export const LoopVideo: FC<LoopVideoProps> = props => {
  // Settled once: a clip carried over from its card stays the card's element for
  // as long as this frame is up, rather than swapping to a fresh one mid-play.
  const [borrowed] = useState(() => hasLentVideo(props.srcMp4))

  if (borrowed) {
    return <BorrowedVideo src={props.srcMp4} />
  }

  return <OwnVideo {...props} />
}
