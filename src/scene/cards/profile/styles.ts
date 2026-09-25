import {INK_STRONG, type TextStyle} from '../../graphics'

export const WIDTH = 596
export const ROW_TOP = 61
export const HINTS_TOP = ROW_TOP + 64 + 44
export const AVATAR = {height: 64, width: 64}

export const NAME: TextStyle = {gradient: INK_STRONG, lineHeight: 24, shadow: true, size: 18, weight: 500}
export const POSITION: TextStyle = {color: 'rgba(255, 255, 255, 0.5)', lineHeight: 24, size: 18, weight: 500}

const HINT: TextStyle = {
  color: 'rgba(255, 255, 255, 0.5)',
  lineHeight: 12,
  size: 12,
  strut: {lineHeight: 24, size: 16},
}

const HINT_MUTED: TextStyle = {...HINT, color: 'rgba(255, 255, 255, 0.3)'}

type Hint =
  | {kind: 'arrows'; width: number; gap: number}
  | {kind: 'keyboard'; width: number; gap: number}
  | {kind: 'text'; text: string; style: TextStyle; gap: number}

export const HINTS: readonly Hint[] = [
  {gap: 6, kind: 'arrows', width: 16},
  {gap: 6, kind: 'text', style: HINT, text: 'Scroll'},
  {gap: 6, kind: 'text', style: HINT_MUTED, text: 'or use'},
  {gap: 4, kind: 'keyboard', width: 25},
  {gap: 6, kind: 'text', style: HINT, text: 'WSAD keys'},
  {gap: 6, kind: 'text', style: HINT_MUTED, text: 'to explore...'},
]
