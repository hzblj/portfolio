import type {EntryShot} from '../types'

const shot: EntryShot = {
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
  title: 'Footshop - Pickup Points',
  variant: 'shot',
}

export default shot
