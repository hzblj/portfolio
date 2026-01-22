import type {EntryShot} from '../types'

const shot: EntryShot = {
  area: 's15',
  description:
    'Parcel drop-off and courier pickup are handled through separate, clearly defined flows. An offline-first approach was required, with data synchronized between multiple devices used at the same pickup point. All actions are stored locally and synced later, so work can continue without interruptions.',
  image: '/jpg/shot-small-15.jpg',
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
  slug: 'dpd-my-pickup-parcel-handover-flows',
  title: 'DPD - Parcel Handover Flows',
  variant: 'shot',
}

export default shot
