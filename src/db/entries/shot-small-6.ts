import type {EntryShot} from '../types'

const shot: EntryShot = {
  area: 's6',
  description:
    'Player settings went through many iterations because it had to control several parts of the experience in one place. It handles opening and closing driver cams, stream options like audio and channel selection, and 3D map settings for cars, DRS zones, and corner numbers. A ornament and sheet with nested navigation was chosen to group related options and keep the main player clean.',
  image: '/jpg/shot-small-6.jpg',
  properties: [
    {
      name: 'Product',
      value: 'Lapz - Watch F1 in visionOS',
    },
    {
      name: 'Technology',
      value: 'Swift, visionOS, RealityKit',
    },
    {
      name: 'Industry',
      value: 'AR / Motorsports',
    },
    {
      name: 'Link',
      url: 'https://lapz.io',
      value: 'lapz.io',
    },
    {
      name: 'Year',
      value: '2024',
    },
  ],
  size: 'small',
  title: 'Lapz - Player Settings',
  variant: 'shot',
}

export default shot
