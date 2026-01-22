import type {EntryShot} from '../types'

const shot: EntryShot = {
  area: 's13',
  description:
    'In F1, weather can decide the whole race. Teams watch radar data all the time to plan strategy and tire choices. We recreated this idea at home by building a large 3D entity placed above the user. The entity displays an animated heatmap texture that visualizes live weather data.',
  image: '/webp/shot-small-13.webp',
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
  slug: 'lapz-weather-radar',
  title: 'Lapz - Weather Radar',
  variant: 'shot',
  videos: {
    mp4: '/webm/shot-small-13.mp4',
    webm: '/webm/shot-small-13.webm',
  },
}

export default shot
