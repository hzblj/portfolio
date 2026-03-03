import type {EntryShot} from '../types'

const shot: EntryShot = {
  animation: {
    from: {opacity: 0, scale: 0.88, x: -1, y: 70},
    origin: 'bottom left',
    to: {delay: 0.2, duration: 1.2, ease: 'bezier-out-back', opacity: 1, scale: 1, x: 0, y: 0},
  },
  area: 's4',
  description:
    'We built a custom design system that adapts to both iPhone and iPad. The same components scale, change spacing, and adjust layouts based on device size. This kept the UI consistent while still feeling native on each device. The system reduced duplication and made screens easier to maintain.',
  image: '/jpg/shot-small-4.jpg',
  properties: [
    {
      name: 'Product',
      value: 'Volvista - Service Technician',
    },
    {
      name: 'Technology',
      value: 'Expo, React Native, TypeScript',
    },
    {
      name: 'Industry',
      value: 'Automotive / Field Service / B2B',
    },
    {
      name: 'Link',
      url: 'https://qest.cz',
      value: 'qest.cz',
    },
    {
      name: 'Year',
      value: '2020',
    },
  ],
  size: 'small',
  slug: 'volvista-adaptive-design-system',
  title: 'Volvista - Adaptive Design System',
  variant: 'shot',
}

export default shot
