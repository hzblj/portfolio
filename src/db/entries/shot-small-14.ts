import type {EntryShot} from '../types'

const shot: EntryShot = {
  area: 's14',
  description:
    'Card payments are processed directly on POS terminals using the Global Payments SDK. The SDK is integrated into the Expo app as a native module, with the core payment logic implemented in Kotlin. This approach allows secure in-person payments.',
  image: '/jpg/shot-small-14.jpg',
  properties: [
    {
      name: 'Product',
      value: 'DPD - My Pickup',
    },
    {
      name: 'Technology',
      value: 'Expo, React Native, TypeScript',
    },
    {
      name: 'Industry',
      value: 'Logistics / Last-Mile Delivery',
    },
    {
      name: 'Link',
      url: 'https://qest.cz',
      value: 'qest.cz',
    },
    {
      name: 'Year',
      value: '2022',
    },
  ],
  size: 'small',
  slug: 'dpd-my-pickup-global-payments-integration',
  title: 'DPD - Global Payments Integration',
  variant: 'shot',
}

export default shot
