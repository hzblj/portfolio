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
  // Shared-element names bridging the shot modal on `/` and the `/[slug]`
  // detail page. Both sides must agree, and only one shot can be open at a
  // time, so plain constants are enough — names have to be unique per document.
  viewTransition: {
    card: 'shot-card',
    media: 'shot-media',
    // The expand/collapse control, shared by the shots and the CV, named in two
    // parts. The pill needs a name of its own or the artwork covers it: groups
    // paint in the order their elements do, and inside the card snapshot the
    // pill sits under `media`. The glyph needs a third name so the two arrow
    // sets can hand over instead of dissolving through each other.
    toggle: 'card-toggle',
    toggleIcon: 'card-toggle-icon',
  },
} as const
