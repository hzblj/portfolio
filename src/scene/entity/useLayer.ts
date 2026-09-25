import {useFrame} from '@react-three/fiber'
import {useLayoutEffect, useMemo, useRef, useState} from 'react'
import type {Mesh, Texture} from 'three'
import {createLayerMaterial, naturalSize, type RGBA, setRGBA, useDisposable, WHITE} from '../graphics'
import type {Rect} from '../grid'
import {useEntity} from './EntityContext'
import {createPlacement, factorOf, type Motions, offsetOf, type Pivot, place} from './motion'

export type VideoSource = {texture: Texture | null; mix: number}

export type LayerOptions = {
  rect: Rect
  radius?: number
  clip?: Rect
  clipRadius?: number
  map?: Texture | null
  fit?: 'cover' | 'fill'
  mapPosition?: readonly [number, number]
  color?: RGBA
  opacity?: number
  motion?: Motions
  pivot?: Pivot
  video?: VideoSource
  alphaGamma?: number
  bleed?: number
  ringWidth?: number
  ringColor?: RGBA
}

export const useLayer = ({
  rect,
  radius = 0,
  clip,
  clipRadius = 0,
  map,
  fit = 'cover',
  mapPosition,
  color = WHITE,
  opacity = 1,
  motion,
  pivot,
  video,
  alphaGamma = 1,
  bleed = 0,
  ringWidth = 0,
  ringColor = WHITE,
}: LayerOptions) => {
  const {size: host, fade} = useEntity()
  const material = useDisposable(useMemo(() => createLayerMaterial(), []))
  const mesh = useRef<Mesh>(null)
  const [placement] = useState(createPlacement)

  useLayoutEffect(() => {
    const {uniforms} = material
    const natural = map && fit === 'cover' ? naturalSize(map) : {height: 0, width: 0}

    uniforms.uMap.value = map ?? null
    uniforms.uHasMap.value = map ? 1 : 0
    uniforms.uMapSize.value.set(natural.width, natural.height)
    uniforms.uMapPosition.value.set(mapPosition?.[0] ?? 0.5, mapPosition?.[1] ?? 0.5)
    uniforms.uClip.value.set(clip?.x ?? 0, clip?.y ?? 0, clip?.width ?? 0, clip?.height ?? 0)
    uniforms.uClipRadius.value = clipRadius
    uniforms.uAlphaGamma.value = alphaGamma
    uniforms.uBleed.value = bleed
    uniforms.uRingWidth.value = ringWidth
    setRGBA(uniforms.uRingColor.value, ringColor)
    setRGBA(uniforms.uColor.value, color)
  }, [alphaGamma, bleed, clip, clipRadius, color, fit, map, mapPosition, material, ringColor, ringWidth])

  useFrame(() => {
    const node = mesh.current

    if (!node) {
      return
    }

    const {x, y, width, height, scale} = place(placement, rect, motion, pivot)
    const {uniforms} = material

    node.position.set(x + width / 2 - host.width / 2, host.height / 2 - y - height / 2, 0)
    node.scale.set(Math.max(width + 2 * bleed, 1e-3), Math.max(height + 2 * bleed, 1e-3), 1)

    uniforms.uRect.value.set(x, y, width, height)
    uniforms.uRadius.value = radius * scale
    uniforms.uBlur.value = offsetOf(motion, 'blur')
    uniforms.uOpacity.value = opacity * factorOf(motion, 'opacity') * fade.opacity

    if (video) {
      const size = video.texture ? naturalSize(video.texture) : {height: 0, width: 0}
      uniforms.uVideo.value = video.texture
      uniforms.uVideoMix.value = video.texture ? video.mix : 0
      uniforms.uVideoSize.value.set(size.width, size.height)
    }
  })

  return {material, mesh}
}
