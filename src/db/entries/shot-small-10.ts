import type {EntryShot} from '../types'

const shot: EntryShot = {
  animation: {
    from: {opacity: 0, scale: 0.88, x: 1, y: 14.5},
    origin: 'bottom right',
    to: {delay: 0.1, duration: 0.8, ease: 'bezier-out-back', opacity: 1, scale: 1, x: 0, y: 0},
  },
  area: 's10',
  description:
    'A custom pickup points map was built for the Footshop mobile app to handle large amounts of locations. The map helps users quickly find nearby pickup points during checkout. Clustering was implemented to keep the map readable at all zoom levels. The solution avoids heavy third-party abstractions and keeps full control over performance and UX.',
  image: '/jpg/shot-small-10.jpg',
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
  size: 'small',
  slug: 'footshop-pickup-points',
  title: 'Footshop - Pickup Points',
  variant: 'shot',
}

export default shot
