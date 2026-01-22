import type {EntryShot} from '../types'

const shot: EntryShot = {
  area: 's16',
  description:
    'The app was built specifically for Zebra devices with a built-in barcode scanner used at pickup points. It handles complex parcel drop-off and courier pickup flows that must work in real store conditions. An offline-first approach was required, because these devices are often used without stable internet. The design focuses on fast scanning, clear flow steps, and reliable daily use on dedicated hardware.',
  image: '/jpg/shot-small-16.jpg',
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
  slug: 'dpd-zebra-device',
  title: 'DPD - Zebra Device',
  variant: 'shot',
}

export default shot
