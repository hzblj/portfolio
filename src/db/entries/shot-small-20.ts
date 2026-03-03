import type {EntryShot} from '../types'

const shot: EntryShot = {
  animation: {
    from: {opacity: 0, scale: 0.88, x: 1, y: -15},
    origin: 'top right',
    to: {delay: 0.1, duration: 0.8, ease: 'bezier-out-back', opacity: 1, scale: 1, x: 0, y: 0},
  },
  area: 's20',
  description:
    'Each team has its own detail page with upcoming and past matches. The page also allows fans to follow a team to stay up to date. Following a team ensures important matches are not missed.',
  image: '/jpg/shot-small-20.jpg',
  properties: [
    {
      name: 'Product',
      value: 'Sportlito',
    },
    {
      name: 'Technology',
      value: 'Expo, React Native, TypeScript',
    },
    {
      name: 'Industry',
      value: 'Sport / Media / Entertainment',
    },
    {
      name: 'Link',
      url: 'https://www.linkedin.com/company/sportlito',
      value: 'sportlito.com',
    },
    {
      name: 'Year',
      value: '2020',
    },
  ],
  size: 'small',
  slug: 'sportlito-teams',
  title: 'Sportlito - Teams',
  variant: 'shot',
}

export default shot
