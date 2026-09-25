'use client'

import {type FC, useMemo} from 'react'

import type {TextStyle} from '../graphics'
import {useText} from '../graphics'
import {Layer} from './Layer'
import type {LayerOptions} from './useLayer'

const TEXT_GAMMA = 1.45

type TextLayerProps = Omit<LayerOptions, 'rect' | 'map' | 'fit' | 'mapPosition'> & {
  text: string
  style: TextStyle
  x: number
  top: number
  align?: 'left' | 'center'
  order: number
}

export const TextLayer: FC<TextLayerProps> = ({text, style, x, top, align = 'left', ...layer}) => {
  const {texture, width, box} = useText(text, style)
  const left = align === 'center' ? x - width / 2 : x
  const rect = useMemo(
    () => ({height: box.height, width: box.width, x: left + box.x, y: top + box.y}),
    [box, left, top]
  )

  return <Layer alphaGamma={TEXT_GAMMA} {...layer} rect={rect} map={texture} fit="fill" />
}
