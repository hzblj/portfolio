import {useFrame} from '@react-three/fiber'
import {useCallback, useRef, useState} from 'react'
import type {Group} from 'three'

import type {Entry} from '@/db'
import {viewBounds} from '../camera'
import {firstCopy, getAreaRect, mod, PERIOD} from '../grid'
import {isSourceSlot} from '../state'
import type {EntityValue} from './EntityContext'
import {parseOrigin, useEntrance} from './useEntrance'

export const SLOTS = [0, 1, 2, 3] as const

export const useSlots = (entry: Entry) => {
  const rect = getAreaRect(entry.area)
  const enter = useEntrance(entry.animation)
  const [originX, originY] = parseOrigin(entry.animation?.origin)

  const outer = useRef<(Group | null)[]>([])
  const inner = useRef<(Group | null)[]>([])
  const [placed] = useState(() => SLOTS.map(() => ({x: rect.x, y: rect.y})))

  const [contexts] = useState(() =>
    SLOTS.map(
      (slot): EntityValue => ({
        fade: enter,
        size: {height: rect.height, width: rect.width},
        slot,
        slug: entry.slug,
        worldRect: () => ({height: rect.height, width: rect.width, ...placed[slot]}),
      })
    )
  )

  useFrame(() => {
    const {left, right, top, bottom} = viewBounds()
    const firstX = firstCopy(rect.x, rect.width, PERIOD.x, left)
    const firstY = firstCopy(rect.y, rect.height, PERIOD.y, top)
    const shiftX = enter.x + (rect.width / 2) * (1 - enter.scale) * originX
    const shiftY = enter.y + (rect.height / 2) * (1 - enter.scale) * originY

    for (const slot of SLOTS) {
      const group = outer.current[slot]
      const content = inner.current[slot]

      if (!group || !content) {
        continue
      }

      const x = rect.x + (firstX + mod((slot & 1) - firstX, 2)) * PERIOD.x
      const y = rect.y + (firstY + mod((slot >> 1) - firstY, 2)) * PERIOD.y

      placed[slot].x = x
      placed[slot].y = y

      group.visible = x < right && y < bottom && !isSourceSlot(entry.slug, slot)
      group.position.set(x + rect.width / 2, -(y + rect.height / 2), 0)
      content.scale.set(enter.scale, enter.scale, 1)
      content.position.set(shiftX, -shiftY, 0)
    }
  })

  const setOuter = useCallback((slot: number, node: Group | null) => {
    outer.current[slot] = node
  }, [])

  const setInner = useCallback((slot: number, node: Group | null) => {
    inner.current[slot] = node
  }, [])

  return {contexts, setInner, setOuter}
}
