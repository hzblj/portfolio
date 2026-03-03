import type {EntryShot} from '../types'

const shot: EntryShot = {
  animation: {
    from: {opacity: 0, scale: 0.88, x: -109, y: 70},
    origin: 'bottom left',
    to: {delay: 0.2, duration: 1.2, ease: 'bezier-out-back', opacity: 1, scale: 1, x: 0, y: 0},
  },
  area: 's5',
  description:
    'We built a complete vehicle service flow for service technicians. A technician finds a car by license plate and opens a detailed view with full service history. During a repair, all work, parts, prices, and photos are added through a simple form. The service report is sent to the client mobile app. The client sees the total cost and confirms the service directly in the app.',
  image: '/jpg/shot-small-5.jpg',
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
  slug: 'volvista-vehicle-service-management',
  title: 'Volvista - Vehicle Service Management',
  variant: 'shot',
}

export default shot
