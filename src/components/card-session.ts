// Which card is open on the grid, if any. Opening its page unmounts the whole
// home layout, so without this, coming back drops you on the bare grid — you
// left from an open card and expect to land back in front of it. Module scope,
// like the camera and the intro: a route change keeps it, a refresh starts clean.
let openCard: string | null = null

// The grid is rendered four times over for the infinite-scroll illusion, so
// every card exists four times and all four would restore the same modal.
// Clicking is naturally exclusive; restoring is not, so it has to be claimed.
// Four stacked copies would not just be wasted DOM — they would each carry the
// same `view-transition-name`, and duplicate names abort the transition
// outright, silently costing the morph in both directions.
let claimedBy: string | null = null

export const setOpenCard = (slug: string | null) => {
  openCard = slug
}

/** True for the first copy of `slug` to ask, until it releases the claim. */
export const claimOpenCard = (slug: string) => {
  if (claimedBy !== null || openCard !== slug) {
    return false
  }

  claimedBy = slug

  return true
}

export const releaseOpenCard = (slug: string) => {
  if (claimedBy === slug) {
    claimedBy = null
  }
}
