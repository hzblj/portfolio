import {use, useMemo} from 'react'

import {Config} from '@/config'

import {loadFonts, measureText} from '../../graphics'
import {AVATAR, HINTS, NAME, POSITION, ROW_TOP, WIDTH} from './styles'

const hintWidth = (hint: (typeof HINTS)[number]) =>
  hint.kind === 'text' ? measureText(hint.text, hint.style) : hint.width

const layoutHints = () => {
  const widths = HINTS.map(hintWidth)
  let cursor = (WIDTH - widths.reduce((sum, width, index) => sum + width + HINTS[index].gap, 0)) / 2

  return widths.map((width, index) => {
    const x = cursor
    cursor += width + HINTS[index].gap

    return x
  })
}

export const useProfileLayout = () => {
  use(loadFonts())

  return useMemo(() => {
    const nameWidth = measureText(Config.fullName, NAME)
    const roleWidth = measureText(Config.company.position, POSITION)
    const companyWidth = measureText(Config.company.name, NAME)
    const textWidth = Math.max(nameWidth, roleWidth + 7 + companyWidth)
    const rowX = (WIDTH - (AVATAR.width + 16 + textWidth)) / 2
    const textX = rowX + AVATAR.width + 16
    const company = {height: 24, width: companyWidth, x: textX + roleWidth + 7, y: ROW_TOP + 32}

    return {
      company,
      hintX: layoutHints(),
      rowX,
      textX,
      underline: {height: 1.5, width: company.width, x: company.x, y: company.y + 24},
    }
  }, [])
}
