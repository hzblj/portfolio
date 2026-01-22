import type {EntryShot} from '../types'

const shot: EntryShot = {
  area: 's11',
  description:
    'The project architecture was reorganized into a single monorepo to support two brands mobile apps from one codebase. Turborepo is used to share core logic, UI components, and business rules between Footshop and Queens. This made it possible to create a new Queens app without copying existing code. Shared packages keep both apps consistent while still allowing brand specific customization. The setup helps speed up development and reduces long term maintenance work.',
  image: '/jpg/shot-small-11.jpg',
  properties: [
    {
      name: 'Product',
      value: 'Queens',
    },
    {
      name: 'Technology',
      value: 'Expo, React Native, TypeScript',
    },
    {
      name: 'Industry',
      value: 'E-commerce / Apparel / Sneakers',
    },
    {
      name: 'Link',
      url: 'https://queens.com',
      value: 'queens.com',
    },
    {
      name: 'Year',
      value: '2025',
    },
  ],
  size: 'small',
  title: 'Queens - Mobile App',
  variant: 'shot',
}

export default shot
