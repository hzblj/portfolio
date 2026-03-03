import type {EntryShot} from '../types'

const shot: EntryShot = {
  animation: {
    from: {opacity: 0, scale: 0.88, x: 109, y: 70},
    origin: 'bottom right',
    to: {delay: 0.2, duration: 1.2, ease: 'bezier-out-back', opacity: 1, scale: 1, x: 0, y: 0},
  },
  area: 's1',
  description:
    'A trending section was added to the Footshop mobile app to show the top 10 products by category. Users can see what is trending in Shoes, Apparel, and Accessories for specific cities like Prague, Berlin, or Paris. The main idea was to help users find inspiration and discover popular styles in different locations.',
  image: '/jpg/shot-small-1.jpg',
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
      value: '2025',
    },
  ],
  size: 'small',
  slug: 'footshop-trending',
  title: 'Footshop - Trending',
  variant: 'shot',
}

export default shot
