import type {EntryShot} from '../types'

const shot: EntryShot = {
  area: 'l2',
  description:
    'Sportlito allows every fan to witness the most exciting moments of their favourite players and clubs through visual stories. These are produced live by an algorithm based on fans preferences, updated in real-time and easily sharable with others.',
  image: '/webp/shot-large-2.webp',
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
  size: 'large',
  title: 'Sportlito - Mobile App',
  variant: 'shot',
  videos: {
    mp4: '/mp4/shot-large-2.mp4',
    webm: '/webm/shot-large-2.webm',
  },
}

export default shot
