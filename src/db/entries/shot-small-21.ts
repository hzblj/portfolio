import type {EntryShot} from '../types'

const shot: EntryShot = {
  animation: {
    from: {opacity: 0, scale: 0.88, x: -1, y: -15},
    origin: 'top left',
    to: {delay: 0.1, duration: 0.8, ease: 'bezier-out-back', opacity: 1, scale: 1, x: 0, y: 0},
  },
  area: 's21',
  description:
    'Stories use an Instagram-style slide format with gesture handling on every slide. Each slide has its own animations for events like goals, cards, and emojis. Timing is managed per slide, with automatic progress to the next one. Title and image animations are part of the flow to keep motion consistent. The whole interaction and animation system is built in Reanimated for smooth performance.',
  image: '/webp/shot-small-21.webp',
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
  slug: 'sportlito-stories',
  title: 'Sportlito - Stories',
  variant: 'shot',
  videos: {
    mp4: '/mp4/shot-small-21.mp4',
    webm: '/webm/shot-small-21.webm',
  },
}

export default shot
