import type {EntryShot} from '../types'

const shot: EntryShot = {
  animation: {
    from: {opacity: 0, scale: 0.88, x: 1, y: 41.5},
    origin: 'bottom right',
    to: {delay: 0.15, duration: 1, ease: 'bezier-out-back', opacity: 1, scale: 1, x: 0, y: 0},
  },
  area: 'l1',
  description:
    'Joined Footshop to lead the development of a new mobile app for iOS and Android. The work started as a small MVP focused on core e-commerce flows. Over time, it evolved into a strategic product used as a main mobile channel. The goal was to move fast, validate ideas early, and still keep the codebase ready for long-term growth. Expo and React Native were chosen to ship quickly on both platforms while keeping performance and developer velocity high.',
  image: '/jpg/shot-large-1.jpg',
  properties: [
    {
      name: 'Product',
      value: 'Footshop',
    },
    {
      name: 'Technology',
      value: 'Expo, React Native, TypeScript',
    },
    {
      name: 'Industry',
      value: 'E-commerce / Fashion / Sneakers',
    },
    {
      name: 'Link',
      url: 'https://footshop.com',
      value: 'footshop.com',
    },
    {
      name: 'Year',
      value: '2023',
    },
  ],
  size: 'large',
  slug: 'footshop-mobile-app',
  title: 'Footshop - Mobile App',
  variant: 'shot',
}

export default shot
