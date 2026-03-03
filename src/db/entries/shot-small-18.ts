import type {EntryShot} from '../types'

const shot: EntryShot = {
  animation: {
    from: {opacity: 0, scale: 0.88, x: -37, y: 0},
    origin: 'center left',
    to: {delay: 0.15, duration: 1, ease: 'bezier-out-back', opacity: 1, scale: 1, x: 0, y: 0},
  },
  area: 's18',
  description:
    'In collaboration with Black Box Infinite, we’ve developed a highly detailed version of the Las Vegas Circuit. By rotating or zooming in on the map, you can explore remarkable landmarks in stunning detail, including the Fountains of Bellagio, the interior seating of The Sphere, and many other iconic features that make Las Vegas unique. For an extra touch of realism, even a helicopter flies overhead every five minutes.',
  image: '/webp/shot-small-18.webp',
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
  slug: 'lapz-watch-f1-in-visionos-map',
  title: 'Lapz - Map',
  variant: 'shot',
  videos: {
    mp4: '/webm/shot-small-18.mp4',
    webm: '/webm/shot-small-18.webm',
  },
}

export default shot
