import type {EntryShot} from '../types'

const shot: EntryShot = {
  animation: {
    from: {opacity: 0, scale: 0.88, x: -37, y: -15},
    origin: 'top left',
    to: {delay: 0.1, duration: 0.8, ease: 'bezier-out-back', opacity: 1, scale: 1, x: 0, y: 0},
  },
  area: 's22',
  description:
    'Meetback was a simple platform for collecting and analyzing feedback from meetings, aiming to enhance their efficiency and effectiveness. Users could request feedback on various aspects such as efficiency, duration, and usefulness, or send anonymous feedback on meetings they had attended.',
  image: '/webp/shot-small-22.webp',
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
  slug: 'meetback-product',
  title: 'Meetback - Product',
  variant: 'shot',
  videos: {
    mp4: '/mp4/shot-small-22.mp4',
    webm: '/webm/shot-small-22.webm',
  },
}

export default shot
