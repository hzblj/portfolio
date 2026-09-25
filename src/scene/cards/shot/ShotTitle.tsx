'use client'

import {type FC, useMemo} from 'react'

import {Layer, TextLayer, useEntity} from '../../entity'
import {type TextStyle, useCanvasTexture} from '../../graphics'
import type {Rect} from '../../grid'

const HEIGHT = 87
const STYLE: TextStyle = {lineHeight: 13, size: 13, weight: 500}

const drawGradient = (ctx: CanvasRenderingContext2D) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT)
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
  gradient.addColorStop(0.2037, 'rgba(0, 0, 0, 0.25)')
  gradient.addColorStop(1, '#000')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 4, HEIGHT)
}

type ShotTitleProps = {
  title: string
  clip: Rect
  motion: {opacity: number; y: number}
}

export const ShotTitle: FC<ShotTitleProps> = ({title, clip, motion}) => {
  const {size} = useEntity()
  const gradient = useCanvasTexture('shot-title', {height: HEIGHT, width: 4}, drawGradient)
  const bar = useMemo(() => ({height: HEIGHT, width: size.width - 2, x: 1, y: size.height - HEIGHT}), [size])

  return (
    <>
      <Layer rect={bar} map={gradient} fit="fill" clip={clip} clipRadius={15} order={5} motion={motion} />
      <TextLayer
        text={title}
        style={STYLE}
        x={17}
        top={size.height - 28}
        clip={clip}
        clipRadius={15}
        order={6}
        motion={motion}
      />
    </>
  )
}
