'use client'

import {type FC, useMemo} from 'react'

import {Layer} from '../../entity'
import {useCanvasTexture} from '../../graphics'
import {ROW_TOP} from './styles'

const SIZE = {height: 4, width: 4}

const drawDot = (ctx: CanvasRenderingContext2D) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 4)
  gradient.addColorStop(0, '#ffffff')
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0.48)')

  ctx.beginPath()
  ctx.arc(2, 2, 2, 0, Math.PI * 2)
  ctx.clip()
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 4, 4)

  ctx.beginPath()
  ctx.rect(-1, -1, 6, 6)
  ctx.arc(2, 2.5, 2, 0, Math.PI * 2)
  ctx.fillStyle = '#ffffff'
  ctx.fill('evenodd')
}

type ContactDotProps = {
  x: number
}

export const ContactDot: FC<ContactDotProps> = ({x}) => {
  const map = useCanvasTexture('contact-dot', SIZE, drawDot)
  const rect = useMemo(() => ({...SIZE, x, y: ROW_TOP + 8.5}), [x])

  return <Layer rect={rect} map={map} fit="fill" order={1} />
}
