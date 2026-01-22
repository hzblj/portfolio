import type {EntryShot} from '../types'

const shot: EntryShot = {
  area: 's12',
  description:
    'An animated splash screen using Lottie is shown when the app starts. It adapts to light and dark mode based on the system appearance.',
  image: '/webp/shot-small-12.webp',
  properties: [
    {
      name: 'Product',
      value: 'Queens',
    },
    {
      name: 'Technology',
      value: 'Expo, React Native, TypeScript',
    },
    {
      name: 'Industry',
      value: 'E-commerce / Apparel / Sneakers',
    },
    {
      name: 'Link',
      url: 'https://queens.com',
      value: 'queens.com',
    },
    {
      name: 'Year',
      value: '2025',
    },
  ],
  size: 'small',
  slug: 'queens-splash-screen',
  title: 'Queens - Splash Screen',
  variant: 'shot',
  videos: {
    mp4: '/webm/shot-small-12.mp4',
    webm: '/webm/shot-small-12.webm',
  },
}

export default shot
