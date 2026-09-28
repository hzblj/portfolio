import {use, useMemo} from 'react'

import type {Contact} from '@/db'

import {loadFonts, measureText} from '../../graphics'
import {openExternal, useHotspots} from '../../interaction'
import {useUnderlines} from '../shared'
import {DIVIDER, LINK, ROW_TOP, WIDTH} from './styles'

const layoutLinks = (contacts: Contact[]) => {
  const widths = contacts.map(contact => measureText(contact.type, LINK))
  let cursor = (WIDTH - widths.reduce((sum, width) => sum + width, 0) - DIVIDER * (contacts.length - 1)) / 2

  return contacts.map((contact, index) => {
    const x = cursor
    cursor += widths[index] + DIVIDER

    return {
      contact,
      link: {height: 21, width: widths[index], x, y: ROW_TOP},
      underline: {height: 1.5, width: widths[index], x, y: ROW_TOP + 21},
    }
  })
}

export const useContactLinks = (contacts: Contact[]) => {
  use(loadFonts())
  const underlines = useUnderlines(contacts.length)
  const links = useMemo(() => layoutLinks(contacts), [contacts])

  const hotspots = useMemo(
    () =>
      links.map(({contact, link}, index) => ({
        onClick: () => openExternal(contact.url),
        onEnter: underlines[index].enter,
        onLeave: underlines[index].leave,
        rect: link,
      })),
    [links, underlines]
  )

  return {links, pointer: useHotspots(hotspots), underlines}
}
