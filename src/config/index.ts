export const Config = {
  company: {
    name: 'Footshop',
    position: 'Lead Mobile Developer at',
    url: 'https://footshop.com',
  },
  // One curve for every floating control — the corner dock on the grid, the
  // expand pill over an open modal, the close button on a phone. They all come
  // and go alongside a modal, so they borrow its timing rather than each
  // carrying its own: opening a card and the controls arriving around it read as
  // one gesture instead of two.
  controls: {
    enterDelay: 0.1,
    enterDuration: 0.3,
    enterEase: 'power2.out',
    exitDuration: 0.2,
    exitEase: 'power2.in',
    // What they shrink to on the way out, matching the modal card itself.
    scale: 0.95,
  },
  fullName: 'Jan Blazej',
  location: {
    city: 'Prague, Czechia',
    mapUrl: 'https://maps.app.goo.gl/7TbuX47ttiZbRms27',
  },
  // The host every absolute URL the site publishes has to carry — canonicals,
  // `og:` tags, the sitemap, the structured data. The apex redirects here, so
  // anything naming it sends a crawler one hop short of where it meant to point,
  // and a canonical that redirects is a canonical arguing with itself.
  site: 'https://www.janblazej.dev',
  viewport: {
    height: 1638,
    width: 2448,
  },
} as const
