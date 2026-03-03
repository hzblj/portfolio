import type {EntryShot} from '../types'

const shot: EntryShot = {
  animation: {
    from: {opacity: 0, scale: 0.88, x: 37, y: -15},
    origin: 'top right',
    to: {delay: 0.1, duration: 0.8, ease: 'bezier-out-back', opacity: 1, scale: 1, x: 0, y: 0},
  },
  area: 's19',
  description:
    'Each story page can be shared as a pre-generated image. The image matches the exact content shown in the app. Sharing uses the native share dialog for a smooth and familiar experience. Fans can easily send match moments to any messaging or social app.',
  image: '/webp/shot-small-19.webp',
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
  slug: 'sportlito-story-sharing',
  title: 'Sportlito - Story Sharing',
  variant: 'shot',
  videos: {
    mp4: '/mp4/shot-small-19.mp4',
    webm: '/webm/shot-small-19.webm',
  },
}

export default shot
