import type {EntryShot} from '../types'

const shot: EntryShot = {
  animation: {
    from: {opacity: 0, scale: 0.88, x: 1, y: -70},
    origin: 'top right',
    to: {delay: 0.2, duration: 1.2, ease: 'bezier-out-back', opacity: 1, scale: 1, x: 0, y: 0},
  },
  area: 's27',
  description:
    'The home screen shows all matches in a single scrollable feed. The list is optimized for fast scrolling and smooth performance. Different card types are supported to display various match states. More content loads automatically at the end of the list. This makes it easy to browse many matches without delays.',
  image: '/webp/shot-small-27.webp',
  properties: [
    {
      name: 'Product',
      value: 'Sportlito',
    },
    {
      name: 'Technology',
      value: 'Expo, React Native, TypeScript',
    },
    {
      name: 'Industry',
      value: 'Sport / Media / Entertainment',
    },
    {
      name: 'Link',
      url: 'https://www.linkedin.com/company/sportlito',
      value: 'sportlito.com',
    },
    {
      name: 'Year',
      value: '2020',
    },
  ],
  size: 'small',
  slug: 'sportlito-match-feed',
  title: 'Sportlito - Match Feed',
  variant: 'shot',
  videos: {
    mp4: '/mp4/shot-small-27.mp4',
    webm: '/webm/shot-small-27.webm',
  },
}

export default shot
