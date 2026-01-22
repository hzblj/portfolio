import type {EntryShot} from '../types'

const shot: EntryShot = {
  area: 's3',
  description:
    'Product listing and PDP screens were designed for the Footshop mobile app with a strong focus on performance. FlashList was used to handle long product lists smoothly on both iOS and Android. Layouts adapt dynamically to different product types, campaigns, and screen sizes. Product cards were built as flexible components that can change structure without breaking scroll performance. The result is fast browsing and a consistent shopping experience even with large catalogs.',
  image: '/jpg/shot-small-3.jpg',
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
  slug: 'footshop-product-listing-details',
  title: 'Footshop - Product Listing & Details',
  variant: 'shot',
}

export default shot
