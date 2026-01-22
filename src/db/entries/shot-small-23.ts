import type {EntryShot} from '../types'

const shot: EntryShot = {
  area: 's23',
  description:
    'A custom video player was built with a fully custom progress bar. The player supports both live and archived playback and integrates FairPlay DRM for protected F1 streams. From the player UI, additional floating windows can be opened, such as driver cams, live data stream, and team radios. An audio controller is placed in the top-right corner for quick access and clear control.',
  image: '/webp/shot-small-23.webp',
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
  title: 'Lapz - Spatial Video Player',
  variant: 'shot',
  videos: {
    mp4: '/mp4/shot-small-23.mp4',
    webm: '/webm/shot-small-23.webm',
  },
}

export default shot
