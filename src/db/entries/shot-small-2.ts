import type {EntryShot} from '../types'

const shot: EntryShot = {
  area: 's2',
  description:
    'Native payments were added to the Footshop mobile app using Adyen as the payment provider. The goal was to make checkout faster and reduce friction on mobile. Apple Pay and Google Pay were integrated to support platform-native payment flows',
  image: '/jpg/shot-small-2.jpg',
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
  slug: 'footshop-native-payments',
  title: 'Footshop - Native Payments',
  variant: 'shot',
}

export default shot
