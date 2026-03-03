import type {EntryShot} from '../types'

const shot: EntryShot = {
  animation: {
    from: {opacity: 0, scale: 0.88, x: -109, y: -70},
    origin: 'top left',
    to: {delay: 0.2, duration: 1.2, ease: 'bezier-out-back', opacity: 1, scale: 1, x: 0, y: 0},
  },
  area: 's29',
  description:
    'I built the feedback builder where users create a feedback form from reusable question blocks. On the left side, questions can be added, reordered with drag and drop, duplicated, or removed. The right side shows a live preview that updates instantly as the form changes. There is also a preview mode to run the feedback flow as a real user would see it.',
  image: '/jpg/shot-small-29.jpg',
  properties: [
    {
      name: 'Product',
      value: 'Meetback',
    },
    {
      name: 'Technology',
      value: 'React, TypeScript',
    },
    {
      name: 'Industry',
      value: 'Business Analytics / Productivity',
    },
    {
      name: 'Link',
      url: 'https://meetback.webflow.io',
      value: 'meetback.io',
    },
    {
      name: 'Year',
      value: '2021',
    },
  ],
  size: 'small',
  slug: 'meetback-feedback-builder',
  title: 'Meetback - Feedback Builder',
  variant: 'shot',
}

export default shot
