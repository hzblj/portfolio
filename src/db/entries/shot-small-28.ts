import type {EntryShot} from '../types'

const shot: EntryShot = {
  animation: {
    from: {opacity: 0, scale: 0.88, x: -1, y: -70},
    origin: 'top left',
    to: {delay: 0.2, duration: 1.2, ease: 'bezier-out-back', opacity: 1, scale: 1, x: 0, y: 0},
  },
  area: 's28',
  description:
    'I built the attendee selection flow to choose exactly who will receive the feedback form. It makes the selection clear and prevents sending feedback to the wrong attendees.',
  image: '/jpg/shot-small-28.jpg',
  properties: [
    {
      name: 'Product',
      value: 'Meetback',
    },
    {
      name: 'Technology',
      value: 'React, TypeScript',
    },
    {
      name: 'Industry',
      value: 'Business Analytics / Productivity',
    },
    {
      name: 'Link',
      url: 'https://meetback.webflow.io',
      value: 'meetback.io',
    },
    {
      name: 'Year',
      value: '2021',
    },
  ],
  size: 'small',
  slug: 'meetback-attendee-selection',
  title: 'Meetback - Attendee Selection',
  variant: 'shot',
}

export default shot
