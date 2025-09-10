export type Contact = {
  type: string
  url: string
}

const contacts: Contact[] = [
  {
    type: 'Email',
    url: 'mailto:hello@janblazej.dev',
  },
  {
    type: 'Instagram',
    url: 'https://www.instagram.com/hzblj',
  },
  {
    type: 'LinkedIn',
    url: 'https://www.linkedin.com/in/hzblj',
  },
  {
    type: 'GitHub',
    url: 'http://github.com/hzblj',
  },
]

export const Config = {
  company: {
    name: 'Footshop',
    position: 'Lead Mobile Developer at',
    url: 'https://footshop.com',
  },
  contacts,
  fullName: 'Jan Blazej',
  layout: {
    height: 3318,
    width: 4368,
  },
  location: {
    city: 'Prague, Czechia',
    mapUrl: 'https://maps.app.goo.gl/7TbuX47ttiZbRms27',
  },
  origin: {x: -188, y: -172},
  viewport: {
    height: 1638,
    width: 2448,
  },
} as const
