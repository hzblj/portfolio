import {Config} from '@/config'

import {mod, type Rect} from './geometry'

const TEMPLATE = [
  's1 s2 l1 l1 s3 s4 s5 s6',
  'gallery gallery l1 l1 contact contact s7 s8',
  'gallery gallery s9 s10 s11 s12 cv s13',
  's14 s15 s16 profile profile s17 cv s18',
  'map map s19 s20 s21 s22 cv s23',
  's24 l2 l2 technologies technologies s25 l3 l3',
  's26 l2 l2 s27 s28 s29 l3 l3',
]

const COLUMN = 290
const ROW = 218
const GAP = 16
const PADDING = 2

type Bounds = {left: number; right: number; top: number; bottom: number}

export const PERIOD = {x: Config.viewport.width, y: Config.viewport.height}

const measureAreas = () => {
  const bounds = new Map<string, Bounds>()

  TEMPLATE.forEach((row, rowIndex) => {
    row.split(' ').forEach((name, columnIndex) => {
      const current = bounds.get(name)

      bounds.set(name, {
        bottom: Math.max(current?.bottom ?? rowIndex, rowIndex),
        left: Math.min(current?.left ?? columnIndex, columnIndex),
        right: Math.max(current?.right ?? columnIndex, columnIndex),
        top: Math.min(current?.top ?? rowIndex, rowIndex),
      })
    })
  })

  const rects = new Map<string, Rect>()

  for (const [name, {left, right, top, bottom}] of bounds) {
    rects.set(name, {
      height: (bottom - top + 1) * (ROW + GAP) - GAP,
      width: (right - left + 1) * (COLUMN + GAP) - GAP,
      x: PADDING + left * (COLUMN + GAP),
      y: PADDING + top * (ROW + GAP),
    })
  }

  return rects
}

const areas = measureAreas()

export const getAreaRect = (area: string): Rect => {
  const rect = areas.get(area)

  if (!rect) {
    throw new Error(`No grid area named "${area}"`)
  }

  return rect
}

export const firstCopy = (start: number, length: number, period: number, from: number) =>
  Math.floor((from - start - length) / period) + 1

export const slotOfCopy = (copyX: number, copyY: number) => mod(copyX, 2) + 2 * mod(copyY, 2)
