'use client'

import {type FC, useMemo} from 'react'

import {Layer, TextLayer} from '../../entity'
import {INK, type TextStyle} from '../../graphics'
import type {Rect} from '../../grid'
import {RAMP_HEIGHT, type Ramp, useRampTexture} from './useRampTexture'

const LABEL: TextStyle = {gradient: INK, gradientHeight: 53, lineHeight: 21, shadow: true, size: 14}

type FootLabelProps = {
  label: string
  ramp: Ramp
  host: Rect
  clip: Rect
  order: number
}

export const FootLabel: FC<FootLabelProps> = ({label, ramp, host, clip, order}) => {
  const map = useRampTexture(ramp)
  const bottom = host.y + host.height
  const rect = useMemo(
    () => ({height: RAMP_HEIGHT, width: host.width, x: host.x, y: bottom - RAMP_HEIGHT}),
    [bottom, host]
  )

  return (
    <>
      <Layer rect={rect} map={map} fit="fill" clip={clip} clipRadius={16} order={order} />
      <TextLayer
        text={label}
        style={LABEL}
        x={host.x + host.width / 2}
        top={bottom - 32 - 21}
        align="center"
        opacity={0.7}
        order={order + 1}
      />
    </>
  )
}
