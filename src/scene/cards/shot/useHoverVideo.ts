import {useCallback, useEffect, useState} from 'react'
import {LinearFilter, NoColorSpace, VideoTexture} from 'three'

import type {EntryShotVideos} from '@/db'

import type {VideoSource} from '../../entity'

const SOURCES = [
  ['webm', 'video/webm'],
  ['mp4', 'video/mp4'],
] as const

const createVideo = (videos: EntryShotVideos) => {
  const element = document.createElement('video')
  element.muted = true
  element.loop = true
  element.playsInline = true
  element.preload = 'auto'

  for (const [key, type] of SOURCES) {
    const source = document.createElement('source')
    source.src = videos[key]
    source.type = type
    element.append(source)
  }

  return element
}

const createVideoTexture = (element: HTMLVideoElement) => {
  const texture = new VideoTexture(element)
  texture.colorSpace = NoColorSpace
  texture.generateMipmaps = false
  texture.minFilter = LinearFilter
  texture.userData.size = {height: 0, width: 0}

  element.addEventListener('loadedmetadata', () => {
    texture.userData.size = {height: element.videoHeight, width: element.videoWidth}
  })

  return texture
}

export const useHoverVideo = (videos?: EntryShotVideos) => {
  const [source] = useState<VideoSource>(() => ({mix: 0, texture: null}))
  const [player] = useState(() => ({element: null as HTMLVideoElement | null}))

  useEffect(
    () => () => {
      player.element?.pause()
      source.texture?.dispose()
    },
    [player, source]
  )

  const play = useCallback(() => {
    if (!videos) {
      return
    }

    if (!player.element) {
      const element = createVideo(videos)
      const texture = createVideoTexture(element)

      element.addEventListener(
        'playing',
        () => {
          source.texture = texture
          source.mix = 1
        },
        {once: true}
      )

      player.element = element
    }

    player.element.play().catch(() => undefined)
  }, [player, source, videos])

  const stop = useCallback(() => {
    if (!player.element) {
      return
    }

    player.element.pause()
    player.element.currentTime = 0
  }, [player])

  return {play, source, stop}
}
