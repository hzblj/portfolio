import type {EntryShot} from '../types'

const shot: EntryShot = {
  animation: {
    from: {opacity: 0, scale: 0.88, x: -37, y: 0},
    origin: 'center left',
    to: {delay: 0.1, duration: 0.8, ease: 'bezier-out-back', opacity: 1, scale: 1, x: 0, y: 0},
  },
  area: 's17',
  description:
    'Queens uses its own API and its own theme, separate from Footshop. Theme colors are defined per app and applied across the UI. Each screen can be customized based on the app needs. The current architecture gives full freedom to adjust visuals and behavior per brand.',
  image: '/jpg/shot-small-17.jpg',
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
  slug: 'queens-brand-customization',
  title: 'Queens - Brand Customization',
  variant: 'shot',
}

export default shot
