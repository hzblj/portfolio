import type {EntryShot} from '../types'

const shot: EntryShot = {
  area: 'l3',
  description:
    'Driver cameras are attached to each car in the 3D map and are opened by tapping the driver badge. After opening, a live onboard stream is shown directly in the spatial scene. The camera follows the selected driver and stays anchored to the car position. Along with the video, key stats are shown, including tire type, speed, current gear, and interval to other drivers.',
  image: '/webp/shot-large-3.webp',
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
  size: 'large',
  title: 'Lapz - Driver Cameras',
  variant: 'shot',
  videos: {
    mp4: '/mp4/shot-large-3.mp4',
    webm: '/webm/shot-large-3.webm',
  },
}

export default shot
