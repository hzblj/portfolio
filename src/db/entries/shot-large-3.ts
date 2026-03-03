import type {EntryShot} from '../types'

const shot: EntryShot = {
  animation: {
    from: {opacity: 0, scale: 0.88, x: -73, y: -15},
    origin: 'top left',
    to: {delay: 0.2, duration: 1.2, ease: 'bezier-out-back', opacity: 1, scale: 1, x: 0, y: 0},
  },
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
  slug: 'lapz-watch-f1-in-visionos-driver-cameras',
  title: 'Lapz - Driver Cameras',
  variant: 'shot',
  videos: {
    mp4: '/mp4/shot-large-3.mp4',
    webm: '/webm/shot-large-3.webm',
  },
}

export default shot
