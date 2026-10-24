import type {EntryLink} from '../types'

// The way out to the libraries site, where shot-small-28 (Meetback's attendee
// selection) used to sit: its grid in miniature, opening the site itself.
const libraries: EntryLink = {
  animation: {
    from: {opacity: 0, scale: 0.88, x: -1, y: -70},
    origin: 'top left',
    to: {delay: 0.2, duration: 1.2, ease: 'bezier-out-back', opacity: 1, scale: 1, x: 0, y: 0},
  },
  area: 's28',
  image: '/jpg/libraries.jpg',
  size: 'small',
  slug: 'libraries',
  title: 'Libraries',
  url: 'https://www.libraries.janblazej.dev',
  variant: 'link',
  videos: {
    mp4: '/mp4/libraries.mp4',
    webm: '/webm/libraries.webm',
  },
}

export default libraries
